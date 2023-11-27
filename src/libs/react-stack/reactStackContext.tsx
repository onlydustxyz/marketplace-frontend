import { createContext, useCallback, useEffect } from "react";
import { StackInterface, StackPanelInterface, StackPosition, StacksInterface } from "./types/Stack";
import { useRefSubscription } from "../react-subscriber/useRefSubscription";
import { RefSubscriptionInterface } from "../react-subscriber/types/RefSubscription";
import { Subscribe } from "../react-subscriber";
import { v4 as uuidv4 } from "uuid";
import { UnsafeCreateRefSubscription } from "../react-subscriber/createRefSubscription";
import { createPortal } from "react-dom";
import { History } from "./components/History";
import { debounce } from "lodash";
interface reactStackContextProps {
  children: React.ReactNode;
}

export type panelEvent = "open" | "close";

export interface History {
  name: string;
  panelId: string;
  params?: any;
}

type IReactStackContext = {
  stacks: [];
  stackStore: RefSubscriptionInterface<StacksInterface>;
  history: RefSubscriptionInterface<History[]>;
  stackMethods: {
    closeAll: () => void;
    register: (stack: RefSubscriptionInterface<StackInterface>) => void;
    getStack: (name: string) => RefSubscriptionInterface<StackInterface> | null;
    getPanel: (name: string, id: string) => RefSubscriptionInterface<StackPanelInterface> | null;
    open: (name: string, params?: any) => void;
    close: (name: string) => void;
    closeLast: () => void;
  };
};

export const ReactStackContext = createContext<IReactStackContext>({
  stacks: [],
  stackStore: {} as RefSubscriptionInterface<StacksInterface>,
  history: {} as RefSubscriptionInterface<History[]>,
  stackMethods: {
    closeAll: () => null,
    register: () => null,
    getStack: () => null,
    getPanel: () => null,
    open: () => null,
    close: () => null,
    closeLast: () => null,
  },
});

export default function ReactStackprovider({ children }: reactStackContextProps) {
  const [stacks, setStacks] = useRefSubscription<StacksInterface>({});
  const [history, setHistory] = useRefSubscription<History[]>([]);

  const registerStack = useCallback(
    (stack: RefSubscriptionInterface<StackInterface>) => {
      if (!stacks.state[stack.state.name]) {
        setStacks(prev => ({
          ...prev,
          [stack.state.name]: stack,
        }));
      }
    },
    [stacks]
  );

  const registerPanel = useCallback(
    (name: string, panelId: string, params?: any) => {
      if (stacks.state[name]) {
        const defaultPanel = Object.assign({}, stacks.state[name].state.defaultPanel);
        stacks.state[name].setValue(prev => ({
          ...prev,
          panels: {
            ...prev.panels,
            [panelId]: UnsafeCreateRefSubscription<StackPanelInterface>({
              open: true,
              position: "hidden",
              id: panelId,
              name,
              params,
              children: defaultPanel.state.children,
            }),
          },
        }));
      }
    },
    [stacks]
  );

  const updatePosition = useCallback(
    (history: { name: string; panelId: string }[]) => {
      const frontPanel = history.at(-1);
      const backPanel = history.at(-2);
      history.forEach(panel => {
        let position: StackPosition = "hidden";
        const panelRef = stacks.state[panel.name]?.state.panels[panel.panelId];
        if (panel.panelId === frontPanel?.panelId) {
          position = history.length === 1 ? "front" : "front-stacked";
        } else if (panel.panelId === backPanel?.panelId) {
          position = "back";
        }

        if (panelRef) {
          panelRef.setValue(prev => {
            return {
              ...prev,
              position,
            };
          });
        }
      });
    },
    [stacks, history]
  );

  const debounceHistory = useCallback(
    debounce(
      (
        newHistory: {
          name: string;
          panelId: string;
        }[]
      ) => {
        setHistory(() => {
          return newHistory;
        });
      },
      300
    ),
    [history]
  );

  const debounceRemove = useCallback(
    debounce((stack: RefSubscriptionInterface<StackInterface>, panelId: string) => {
      stack.setValue(prev => {
        return {
          ...prev,
          panels: (prev.panels = Object.fromEntries(Object.entries(prev.panels).filter(([key]) => key !== panelId))),
        };
      });
    }, 300),
    [history]
  );

  const updateHistory = useCallback(
    (name: string, panelId: string, event: panelEvent, params?: any) => {
      let currentHistory = [...history.state];
      if (event === "close") {
        currentHistory = currentHistory.filter(item => item.panelId !== panelId);
        debounceHistory(currentHistory);
      } else {
        if (stacks.state[name]?.state.panels[panelId]) {
          currentHistory = [...currentHistory, { name, panelId }];
          setHistory(prev => {
            return [...prev, { name, panelId, params }];
          });
          currentHistory = history.state;
        }
      }
      updatePosition(currentHistory);
    },
    [stacks, history]
  );

  const closeAll = useCallback(() => {
    /** TODO remove duplicate panels here */
    /** TODO delay the close */
    history.state.forEach(panel => {
      stacks.state[panel.name].setValue(prev => {
        return {
          ...prev,
          position: "hidden",
          open: false,
        };
      });
    });

    history.setValue([]);
  }, [stacks]);

  const openPanel = useCallback(
    (panel: RefSubscriptionInterface<StackPanelInterface>, params?: any) => {
      if (panel.state.open === false) {
        panel.setValue(prev => {
          return {
            ...prev,
            open: true,
            position: history.state.length === 1 ? "front" : "front-stacked",
            params,
          };
        });
        updateHistory(panel.state.name, panel.state.id, "open", params);
      } else {
        const panelId = uuidv4();
        registerPanel(panel.state.name, panelId, params);
        updateHistory(panel.state.name, panelId, "open", params);
      }
    },
    [stacks]
  );

  const closePanel = useCallback(
    (panel: RefSubscriptionInterface<StackPanelInterface>) => {
      if (panel.state.open === true) {
        if (history.state.at(-1)?.panelId === panel.state.id) {
          updateHistory(panel.state.name, panel.state.id, "close");
          panel.setValue(prev => {
            return {
              ...prev,
              open: false,
              position: "hidden",
            };
          });
        }
      }
    },
    [stacks]
  );

  const removePanel = useCallback(
    (panel: RefSubscriptionInterface<StackPanelInterface>, stack: RefSubscriptionInterface<StackInterface>) => {
      const { name, id } = { ...panel.state };
      if (panel.state.open === true) {
        if (history.state.at(-1)?.panelId === panel.state.id) {
          panel.setValue(prev => {
            return {
              ...prev,
              open: false,
              position: "hidden",
            };
          });
          debounceRemove(stack, id);

          updateHistory(name, id, "close");
        }
      }
    },
    [stacks]
  );

  const togglePanel = useCallback(
    (name: string, event: panelEvent, params?: any) => {
      if (stacks.state[name]) {
        const lastPanelInHistory = history.state.findLast(p => p.name === name);
        const defaultPanelId = lastPanelInHistory?.panelId || stacks.state[name].state.defaultPanelId;
        const currentStack = stacks.state[name].state;
        const currentPanel = currentStack.panels[defaultPanelId];
        if (event === "open") {
          openPanel(currentPanel, params);
        } else if (event === "close") {
          if (history.state.filter(p => p.name === name).length > 1) {
            removePanel(currentPanel, stacks.state[name]);
          } else {
            closePanel(currentPanel);
          }
        }
      }
    },
    [stacks]
  );

  const closeLast = useCallback(() => {
    const lastPanelInHistory = history.state.at(-1);
    if (lastPanelInHistory) {
      const stackName = lastPanelInHistory.name;
      const panelId = lastPanelInHistory.panelId;
      const currentStack = stacks.state[stackName].state;
      const currentPanel = currentStack.panels[panelId];
      if (history.state.filter(p => p.name === stackName).length > 1) {
        removePanel(currentPanel, stacks.state[stackName]);
      } else {
        closePanel(currentPanel);
      }
    }
  }, [stacks]);

  const getStack = useCallback(
    (name: string) => {
      return stacks.state[name] || null;
    },
    [stacks]
  );

  const getPanel = useCallback(
    (name: string, id: string) => {
      return stacks.state[name]?.state.panels[id] || null;
    },
    [stacks]
  );

  useEffect(() => {
    stacks.register();
  }, []);

  return (
    <ReactStackContext.Provider
      value={{
        stacks: [],
        stackStore: stacks,
        history,
        stackMethods: {
          register: registerStack,
          closeAll,
          closeLast,
          getStack,
          getPanel,
          open: (name: string, params?: any) => togglePanel(name, "open", params),
          close: (name: string) => togglePanel(name, "close"),
        },
      }}
    >
      {createPortal(
        <div data-stack-root="true" id="stack-panel-root">
          {children}
          <History />
        </div>,
        document.body
      )}
      <Subscribe to={stacks}>{newValue => <>{console.log("Store", newValue)}</>}</Subscribe>
      <Subscribe to={history}>{newValue => <>{console.log("History", newValue)}</>}</Subscribe>
    </ReactStackContext.Provider>
  );
}
