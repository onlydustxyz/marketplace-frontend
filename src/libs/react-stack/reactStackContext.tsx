import { createContext, useCallback, useEffect } from "react";
import { StackInterface, StackPanelInterface, StackPosition, StacksInterface } from "./types/Stack";
import { useRefSubscription } from "../react-subscriber/useRefSubscription";
import { RefSubscriptionInterface } from "../react-subscriber/types/RefSubscription";
import { Subscribe } from "../react-subscriber";
import { v4 as uuidv4 } from "uuid";
import { UnsafeCreateRefSubscription } from "../react-subscriber/createRefSubscription";
import { createPortal } from "react-dom";
interface reactStackContextProps {
  children: React.ReactNode;
}

export type panelEvent = "open" | "close";

type IReactStackContext = {
  stacks: [];
  stackStore: RefSubscriptionInterface<StacksInterface>;
  history: RefSubscriptionInterface<string[]>;
  stackMethods: {
    closeAll: () => void;
    register: (stack: RefSubscriptionInterface<StackInterface>) => void;
    getStack: (name: string) => RefSubscriptionInterface<StackInterface> | null;
    getPanel: (name: string, id: string) => RefSubscriptionInterface<StackPanelInterface> | null;
    open: (name: string) => void;
    close: (name: string) => void;
  };
};

export const ReactStackContext = createContext<IReactStackContext>({
  stacks: [],
  stackStore: {} as RefSubscriptionInterface<StacksInterface>,
  history: {} as RefSubscriptionInterface<string[]>,
  stackMethods: {
    closeAll: () => null,
    register: () => null,
    getStack: () => null,
    getPanel: () => null,
    open: () => null,
    close: () => null,
  },
});

export default function ReactStackprovider({ children }: reactStackContextProps) {
  const [stacks, setStacks] = useRefSubscription<StacksInterface>({});
  const [history, setHistory] = useRefSubscription<string[]>([]);
  const [history2, setHistory2] = useRefSubscription<{ name: string; panelId: string }[]>([]);

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
    (name: string, panelId: string) => {
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
              children: defaultPanel.state.children,
            }),
          },
        }));
      }
    },
    [stacks]
  );

  const updatePosition = useCallback(() => {
    const frontPanel = history2.state.at(-1);
    const backPanel = history2.state.at(-2);
    history2.state.forEach(panel => {
      let position: StackPosition = "hidden";
      const panelRef = stacks.state[panel.name]?.state.panels[panel.panelId];
      if (panel.panelId === frontPanel?.panelId) {
        position = "front";
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
  }, [stacks, history]);

  const updateHistory = useCallback(
    (name: string, panelId: string, event: panelEvent) => {
      if (event === "close") {
        setHistory2(prev => {
          return prev.filter(item => item.panelId !== panelId);
        });
      } else {
        if (stacks.state[name]?.state.panels[panelId]) {
          setHistory2(prev => {
            return [...prev, { name, panelId }];
          });
        }
      }
      updatePosition();
    },
    [stacks, history]
  );

  const closeAll = useCallback(() => {
    history.state.forEach(panel => {
      stacks.state[panel].setValue(prev => {
        return {
          ...prev,
          position: "hidden",
          open: false,
        };
      });
    });
  }, [stacks]);

  const openPanel = useCallback(
    (panel: RefSubscriptionInterface<StackPanelInterface>) => {
      if (panel.state.open === false) {
        panel.setValue(prev => {
          return {
            ...prev,
            open: true,
            position: "front",
          };
        });
        updateHistory(panel.state.name, panel.state.id, "open");
      } else {
        const panelId = uuidv4();
        registerPanel(panel.state.name, panelId);
        updateHistory(panel.state.name, panelId, "open");
      }
    },
    [stacks]
  );

  const closePanel = useCallback(
    (panel: RefSubscriptionInterface<StackPanelInterface>) => {
      if (panel.state.open === true) {
        if (history2.state.at(-1)?.panelId === panel.state.id) {
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
        if (history2.state.at(-1)?.panelId === panel.state.id) {
          panel.setValue(prev => {
            return {
              ...prev,
              open: false,
              position: "hidden",
            };
          });
          stack.setValue(prev => {
            return {
              ...prev,
              panels: (prev.panels = Object.fromEntries(
                Object.entries(prev.panels).filter(([key]) => key !== panel.state.id)
              )),
            };
          });

          updateHistory(name, id, "close");
        }
      }
    },
    [stacks]
  );

  const togglePanel = useCallback(
    (name: string, event: panelEvent) => {
      if (stacks.state[name]) {
        const lastPanelInHistory = history2.state.findLast(p => p.name === name);
        const defaultPanelId = lastPanelInHistory?.panelId || stacks.state[name].state.defaultPanelId;
        const currentStack = stacks.state[name].state;
        const currentPanel = currentStack.panels[defaultPanelId];
        if (event === "open") {
          openPanel(currentPanel);
        } else if (event === "close") {
          if (history2.state.filter(p => p.name === name).length > 1) {
            removePanel(currentPanel, stacks.state[name]);
          } else {
            closePanel(currentPanel);
          }
        }
      }
    },
    [stacks]
  );

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
          getStack,
          getPanel,
          open: (name: string) => togglePanel(name, "open"),
          close: (name: string) => togglePanel(name, "close"),
        },
      }}
    >
      {createPortal(<div data-stack-root="true">{children}</div>, document.body)}
      <Subscribe to={stacks}>{newValue => <>{console.log("Store", newValue)}</>}</Subscribe>
      <Subscribe to={history2}>{newValue => <>{console.log("History2", newValue)}</>}</Subscribe>
    </ReactStackContext.Provider>
  );
}
