import { useCallback, useEffect } from "react";
import { StackInterface, StackPanelInterface, StackPosition, StacksInterface, StacksParams } from "../types/Stack";
import { v4 as uuidv4 } from "uuid";
import { createPortal } from "react-dom";
import { debounce } from "lodash";
import {
  History,
  RegisterPanel,
  RegisterStack,
  UpdateHistory,
  UpdatePanelOrder,
  reactStackContextProps,
} from "./stack.context.type";
import { RefSubscriptionInterface, useRefSubscription } from "src/libs/react-subscriber";
import { UnsafeCreateRefSubscription } from "src/libs/react-subscriber/createRefSubscription";
import { ReactStackContext } from "./stack.context";
import { History as HistoryComponent } from "../components/History";

export default function ReactStackprovider({ children }: reactStackContextProps) {
  const [stacks, setStacks] = useRefSubscription<StacksInterface>({});
  const [history, setHistory] = useRefSubscription<History[]>([]);

  /* -------------------------------------------------------------------------- */
  /*                                    UTILS                                   */
  /* -------------------------------------------------------------------------- */

  const getLastPanelInHistory = (name: string) => {
    return history.state.findLast(p => p.name === name);
  };

  const getPanelFromStackNameAndPanelId = (name: string, id: string) => {
    const stack = stacks.state[name];
    const panel = stack.state.panels[id];
    return { stack, panel };
  };

  const getPanelFromStackName = (name: string) => {
    const stack = stacks.state[name].state;
    const lastPanelInHistory = getLastPanelInHistory(name);
    const id = lastPanelInHistory?.panelId || stack.defaultPanelId;
    const panel = stack.panels[id];

    return { panel, id, stack };
  };

  /* -------------------------------------------------------------------------- */
  /*                                  REGISTER                                  */
  /* -------------------------------------------------------------------------- */
  const registerStack = (stack: RegisterStack) => {
    if (!stacks.state[stack.state.name]) {
      setStacks(prev => ({
        ...prev,
        [stack.state.name]: stack,
      }));
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            PANEL REF MANAGEMENT                            */
  /* -------------------------------------------------------------------------- */

  const registerPanel = ({ name, panelId, params }: RegisterPanel) => {
    const stack = stacks.state[name];

    if (stack) {
      const defaultPanel = { ...stack.state.defaultPanel };
      stack.setValue(prev => ({
        ...prev,
        panels: {
          ...prev.panels,
          [panelId]: UnsafeCreateRefSubscription<StackPanelInterface>({
            open: true,
            position: "hidden",
            id: panelId,
            name,
            params: params || {},
            children: defaultPanel.state.children,
          }),
        },
      }));
    }
  };

  const removePanel = (
    panel: RefSubscriptionInterface<StackPanelInterface>,
    stack: RefSubscriptionInterface<StackInterface>
  ) => {
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

        updateHistory({ name, panelId: id, event: "close" });
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  DEBOUNCE                                  */
  /* -------------------------------------------------------------------------- */

  const debounceHistory = useCallback(
    debounce((newHistory: { name: string; panelId: string }[]) => {
      setHistory(() => newHistory);
    }, 300),
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

  const debounceCloseAll = useCallback(
    debounce(() => {
      history.state.forEach(panel => {
        stacks.state[panel.name].setValue(prev => {
          return {
            ...prev,
            panels: Object.fromEntries(Object.entries(prev.panels).filter(([key]) => key === prev.defaultPanelId)),
          };
        });
      });
      history.setValue([]);
    }, 300),
    [history]
  );

  /* -------------------------------------------------------------------------- */
  /*                                   HISTORY                                  */
  /* -------------------------------------------------------------------------- */

  const updateHistory = ({ name, panelId, event, params }: UpdateHistory) => {
    let updatedHistory = [...history.state];

    if (event === "close") {
      updatedHistory = updatedHistory.filter(item => item.panelId !== panelId);
      debounceHistory(updatedHistory);
    } else {
      const panelExists = stacks.state[name]?.state.panels[panelId] !== undefined;

      if (panelExists) {
        updatedHistory = [...updatedHistory, { name, panelId }];
        setHistory(prev => [...prev, { name, panelId, params }]);
        updatedHistory = history.state;
      }
    }

    updatePanelOrder({ history: updatedHistory });
  };

  /* -------------------------------------------------------------------------- */
  /*                                  ORDERING                                  */
  /* -------------------------------------------------------------------------- */

  const updatePanelOrder = ({ history }: UpdatePanelOrder) => {
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
        panelRef.setValue(prev => ({
          ...prev,
          position,
        }));
      }
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                PANEL OPENING                               */
  /* -------------------------------------------------------------------------- */
  const openPanel = (name: string, params?: StacksParams) => {
    const { panel } = getPanelFromStackName(name);

    if (panel.state.open === false) {
      panel.setValue(prev => {
        return {
          ...prev,
          open: true,
          position: history.state.length === 1 ? "front" : "front-stacked",
          params: params || {},
        };
      });
      updateHistory({ name: panel.state.name, panelId: panel.state.id, event: "open", params });
    } else {
      const panelId = uuidv4();
      registerPanel({ name: panel.state.name, panelId, params });
      updateHistory({ name: panel.state.name, panelId, event: "open", params });
    }
  };

  const onClose = useCallback(
    (name: string, panelId: string) => {
      const { panel, stack } = getPanelFromStackNameAndPanelId(name, panelId);
      removePanel(panel, stack);
    },
    [stacks]
  );

  const onCloseLastPanel = useCallback(() => {
    const lastHistoryElement = history.state.at(-1);
    if (lastHistoryElement) {
      const stackName = lastHistoryElement.name;
      const panelId = lastHistoryElement.panelId;
      const { panel, stack } = getPanelFromStackNameAndPanelId(stackName, panelId);

      removePanel(panel, stack);
    }
  }, [stacks]);

  const closeAll = useCallback(() => {
    history.state.forEach(panel => {
      stacks.state[panel.name].state.panels[panel.panelId].setValue(prev => {
        return {
          ...prev,
          position: "hidden",
          open: false,
        };
      });
    });

    debounceCloseAll();
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
          closeLast: onCloseLastPanel,
          getStack,
          getPanel,
          open: openPanel,
          close: onClose,
        },
      }}
    >
      {createPortal(
        <div data-stack-root="true" id="stack-panel-root">
          {children}
          <HistoryComponent />
        </div>,
        document.body
      )}
    </ReactStackContext.Provider>
  );
}
