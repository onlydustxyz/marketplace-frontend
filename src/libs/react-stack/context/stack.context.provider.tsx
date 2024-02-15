"use client";

import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import { RefSubscriptionInterface, useRefSubscription } from "src/libs/react-subscriber";
import { unsafeCreateRefSubscription } from "src/libs/react-subscriber/createRefSubscription";

import { History as HistoryComponent } from "../components/History";
import { StackInterface, StackPanelInterface, StackPosition, StacksInterface, StacksParams } from "../types/Stack";
import { ReactStackContext } from "./stack.context";
import {
  HistoryStore,
  RegisterPanel,
  RegisterStack,
  UpdateHistory,
  UpdatePanelOrder,
  reactStackContextProps,
} from "./stack.context.type";

export default function ReactStackprovider({ children }: reactStackContextProps) {
  /* -------------------------------------------------------------------------- */
  /*                                STACKS STORE                                */
  /* -------------------------------------------------------------------------- */
  const [stacks, setStacks] = useRefSubscription<StacksInterface>({});

  /* -------------------------------------------------------------------------- */
  /*                                HISTORY STORE                               */
  /* -------------------------------------------------------------------------- */
  const [historyStore, setHistory] = useRefSubscription<HistoryStore[]>([]);

  /* -------------------------------------------------------------------------- */
  /*                                    UTILS                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Retrieves the last panel in the history with the specified name.
   * @param name - The name of the panel to search for.
   * @returns The last panel in the history with the specified name, or undefined if not found.
   */
  const getLastPanelInHistory = (name: string) => {
    // Property 'findLast' does not exist on type 'HistoryStore[]'. when running TSC but it's working fine
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return historyStore.state.findLast(p => p.name === name);
  };

  /**
   * Retrieves the stack and panel object based on the given stack name and panel ID.
   * @param name - The name of the stack.
   * @param id - The ID of the panel.
   * @returns An object containing the stack and panel.
   */
  const getPanelFromStackNameAndPanelId = (name: string, id: string) => {
    try {
      const stack = stacks.state[name];
      const panel = stack.state.panels[id];
      return { stack, panel };
    } catch (e) {
      console.warn("stacks - getPanelFromStackNameAndPanelId error", e);
      return undefined;
    }
  };

  /**
   * Retrieves the panel information from the stack context based on the given name.
   * @param name - The name of the stack.
   * @returns An object containing the panel, panel ID, and stack.
   */
  const getPanelFromStackName = (name: string) => {
    try {
      const stack = stacks.state[name];
      const lastPanelInHistory = getLastPanelInHistory(name);
      const id = lastPanelInHistory?.panelId || stack.state.defaultPanelId;
      const panel = stack.state.panels[id];

      return { panel, id, stack };
    } catch (e) {
      console.warn("stacks - getPanelFromStackName error", e);
      return undefined;
    }
  };

  const removeActiveBlurElement = () => {
    if (document?.activeElement) {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement?.blur) {
        activeElement.blur();
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  REGISTER                                  */
  /* -------------------------------------------------------------------------- */
  /**
   * Registers a stack in the context provider.
   * If the stack with the same name already exists, it will not be registered.
   * @param stack - The stack to register.
   */
  const registerStack = (stack: RegisterStack) => {
    try {
      if (!stacks.state[stack.state.name]) {
        setStacks(prev => ({
          ...prev,
          [stack.state.name]: stack,
        }));
      }
    } catch (e) {
      console.warn("stacks - registerStack error", e);
      // registerStack error
    }
  };

  const unRegisterStack = (name: string) => {
    try {
      if (stacks.state[name]) {
        setStacks(prev => {
          const newState = { ...prev };
          delete newState[name];
          return newState;
        });
      }
    } catch (e) {
      console.warn("stacks - unRegisterStack error", e);
      // unRegisterStack error
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            PANEL REF MANAGEMENT                            */
  /* -------------------------------------------------------------------------- */

  /**
   * Registers a panel in the stack context provider.
   *
   * @param name - The name of the stack.
   * @param panelId - The ID of the panel.
   * @param params - Optional parameters for the panel.
   */
  const registerPanel = ({ name, panelId, params }: RegisterPanel) => {
    try {
      const stack = stacks.state[name];

      if (stack) {
        const defaultPanel = { ...stack.state.defaultPanel };
        stack.setValue(prev => ({
          ...prev,
          panels: {
            ...prev.panels,
            [panelId]: unsafeCreateRefSubscription<StackPanelInterface>({
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
    } catch (e) {
      console.warn("stacks - registerPanel error", e);
      // registerPanel error
    }
  };

  /**
   * Removes a panel from a selected stack.
   *
   * @param panel - The panel to be removed.
   * @param stack - The stack containing the panel.
   */
  const removePanel = (
    panel: RefSubscriptionInterface<StackPanelInterface>,
    stack: RefSubscriptionInterface<StackInterface>
  ) => {
    try {
      const { name, id } = { ...panel.state };
      if (panel.state.open === true) {
        if (historyStore.state.at(-1)?.panelId === panel.state.id) {
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
    } catch (e) {
      console.warn("stacks - removePanel error", e);
      // removePanel error
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  DEBOUNCE                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Debounces the update of the history state.
   *
   * @param {Array<{ name: string; panelId: string }>} newHistory - The new history to set.
   */
  const debounceHistory = useCallback(
    debounce((newHistory: { name: string; panelId: string }[]) => {
      setHistory(() => newHistory);
    }, 300),
    [history]
  );

  /**
   * Debounces the removal of a panel from the stack.
   *
   * @param {RefSubscriptionInterface<StackInterface>} stack - The stack reference.
   * @param {string} panelId - The ID of the panel to be removed.
   */
  const debounceRemove = useCallback(
    debounce((stack: RefSubscriptionInterface<StackInterface>, panelId: string) => {
      try {
        stack.setValue(prev => {
          return {
            ...prev,
            panels: (prev.panels = Object.fromEntries(
              Object.entries(prev.panels).filter(([key]) => key !== panelId || key === prev.defaultPanelId)
            )),
          };
        });
      } catch (e) {
        console.warn("stacks - debounceRemove error", e);
        // debounceRemove error
      }
    }, 300),
    [history]
  );

  /**
   * Debounces the closing of all panels in the stack context provider.
   *
   * @param history - The history state object.
   */
  const debounceCloseAll = useCallback(
    debounce(() => {
      try {
        historyStore.state.forEach(panel => {
          stacks.state[panel.name].setValue(prev => {
            return {
              ...prev,
              panels: Object.fromEntries(Object.entries(prev.panels).filter(([key]) => key === prev.defaultPanelId)),
            };
          });
        });
        historyStore.setValue([]);
      } catch (e) {
        console.warn("stacks - debounceCloseAll error", e);
        // debounceCloseAll error
      }
    }, 300),
    [history]
  );

  /* -------------------------------------------------------------------------- */
  /*                                   HISTORY                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Updates the history state based on the provided parameters.
   * If the event is "close", removes the panel with the specified panelId from the history state.
   * If the panel with the specified panelId exists in the stacks state, adds it to the history state.
   * Finally, updates the panel order based on the updated history state.
   *
   * @param {UpdateHistory} options - The options for updating the history state.
   * @param {string} options.name - The name of the panel.
   * @param {string} options.panelId - The ID of the panel.
   * @param {string} options.event - The event type ("close" or any other value).
   * @param {any} options.params - Additional parameters for the panel.
   */
  const updateHistory = ({ name, panelId, event, params }: UpdateHistory) => {
    try {
      let updatedHistory = [...historyStore.state];

      if (event === "close") {
        updatedHistory = updatedHistory.filter(item => item.panelId !== panelId);
        debounceHistory(updatedHistory);
      } else {
        const panelExists = stacks.state[name]?.state.panels[panelId] !== undefined;

        if (panelExists) {
          updatedHistory = [...updatedHistory, { name, panelId }];
          setHistory(prev => [...prev, { name, panelId, params }]);
          updatedHistory = historyStore.state;
        }
      }

      updatePanelOrder({ newHistoryStore: updatedHistory });
    } catch (e) {
      console.warn("stacks - updateHistory error", e);
      // updateHistory error
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  ORDERING                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Updates the order of panels in the stack context provider.
   * @param {UpdatePanelOrder} options - The options for updating the panel order.
   */
  const updatePanelOrder = ({ newHistoryStore }: UpdatePanelOrder) => {
    try {
      const frontPanel = newHistoryStore.at(-1);
      const backPanel = newHistoryStore.at(-2);

      newHistoryStore.forEach(panel => {
        let position: StackPosition = "hidden";
        const panelRef = stacks.state[panel.name]?.state.panels[panel.panelId];

        if (panel.panelId === frontPanel?.panelId) {
          position = newHistoryStore.length === 1 ? "front" : "front-stacked";
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
    } catch (e) {
      console.warn("stacks - updatePanelOrder error", e);
      // updatePanelOrder error
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                PANEL OPENING                               */
  /* -------------------------------------------------------------------------- */
  /**
   * Open a panel with the specified name and parameters.
   * If the panel is already open, a new panel with a unique ID will be registered.
   * Updates the history and returns the name and ID of the opened panel.
   *
   * @param name - The name of the panel to open.
   * @param params - Optional parameters for the panel.
   * @returns An object containing the name and ID of the opened panel.
   */
  const openPanel = (name: string, params?: StacksParams) => {
    try {
      const getPanel = getPanelFromStackName(name);
      if (getPanel) {
        const { panel } = getPanel;
        removeActiveBlurElement();
        if (panel.state.open === false) {
          panel.setValue(prev => {
            return {
              ...prev,
              open: true,
              position: historyStore.state.length === 1 ? "front" : "front-stacked",
              params: params || {},
            };
          });
          updateHistory({ name: panel.state.name, panelId: panel.state.id, event: "open", params });
          return { name: panel.state.name, panelId: panel.state.id };
        } else {
          const panelId = uuidv4();
          registerPanel({ name: panel.state.name, panelId, params });
          updateHistory({ name: panel.state.name, panelId, event: "open", params });
          return { name: panel.state.name, panelId };
        }
      }
    } catch (e) {
      console.warn("stacks - openPanel error", e);
      // openPanel error
    }
  };

  /**
   * Closes a panel by its name and panel ID.
   *
   * @param name - The name of the panel.
   * @param panelId - The ID of the panel.
   */
  const onCloseByPanelId = useCallback(
    (name: string, panelId: string) => {
      try {
        const getPanel = getPanelFromStackNameAndPanelId(name, panelId);
        if (getPanel) {
          const { panel, stack } = getPanel;
          removePanel(panel, stack);
        }
      } catch (e) {
        console.warn("stacks - onCloseByPanelId error", e);
        // onCloseByPanelId error
      }
    },
    [stacks]
  );

  /**
   * Handle the closing of the last copy in the stack.
   *
   * @param name - The name of the stack.
   */
  const onCloseLastCopy = useCallback(
    (name: string) => {
      try {
        const getPanel = getPanelFromStackName(name);
        if (getPanel) {
          const { panel, stack } = getPanel;
          removePanel(panel, stack);
        }
      } catch (e) {
        console.warn("stacks - onCloseLastCopy error", e);
        // onCloseLastCopy error
      }
    },
    [stacks]
  );

  /**
   * Callback function that is called when the last panel is closed.
   * It retrieves the last history element, extracts the stack name and panel ID,
   * and removes the corresponding panel from the stack.
   */
  const onCloseLastPanel = useCallback(() => {
    try {
      const lastHistoryElement = historyStore.state.at(-1);
      if (lastHistoryElement) {
        const stackName = lastHistoryElement.name;
        const panelId = lastHistoryElement.panelId;
        const getPanel = getPanelFromStackNameAndPanelId(stackName, panelId);
        if (getPanel) {
          const { panel, stack } = getPanel;
          removePanel(panel, stack);
        }
      }
    } catch (e) {
      console.warn("stacks - onCloseLastPanel error", e);
      // onCloseLastPanel error
    }
  }, [stacks]);

  /**
   * Callback function to handle the closing of a stack panel.
   * If both `name` and `panelId` are provided, it calls `onCloseByPanelId` function.
   * If only `name` is provided, it calls `onCloseLastCopy` function.
   * If neither `name` nor `panelId` are provided, it calls `onCloseLastPanel` function.
   * @param name - The name of the stack panel.
   * @param panelId - The ID of the stack panel.
   */
  const onClose = useCallback(
    (name?: string, panelId?: string) => {
      try {
        if (name && panelId) {
          onCloseByPanelId(name, panelId);
        } else if (name) {
          onCloseLastCopy(name);
        } else {
          onCloseLastPanel();
        }
      } catch (e) {
        console.warn("stacks - onClose error", e);
        // onClose error
      }
    },
    [stacks]
  );

  /**
   * Closes all panels in the stack.
   */
  const closeAll = useCallback(() => {
    try {
      historyStore.state.forEach(panel => {
        stacks.state[panel.name].state.panels[panel.panelId].setValue(prev => {
          return {
            ...prev,
            position: "hidden",
            open: false,
          };
        });
      });
    } catch (e) {
      console.warn("stacks - closeAll error", e);
      // closeAll error
    }

    debounceCloseAll();
  }, [stacks]);

  /**
   * Retrieves the stack with the specified name from the stacks state.
   * @param name - The name of the stack to retrieve.
   * @returns The stack with the specified name, or null if it doesn't exist.
   */
  const getStack = useCallback(
    (name: string) => {
      try {
        return stacks.state[name] || null;
      } catch (e) {
        console.warn("stacks - getStack error", e);
        // getStack error
        return null;
      }
    },
    [stacks]
  );

  /**
   * Retrieves a panel from the stack context based on its name and ID.
   * @param name - The name of the stack.
   * @param id - The ID of the panel.
   * @returns The panel object if found, otherwise null.
   */
  const getPanel = useCallback(
    (name: string, id: string) => {
      try {
        return stacks.state[name]?.state.panels[id] || null;
      } catch (e) {
        console.warn("stacks - getPanel error", e);
        // getPanel error
        return null;
      }
    },
    [stacks]
  );

  /* -------------------------------------------------------------------------- */
  /*                                   EVENTS                                   */
  /* -------------------------------------------------------------------------- */

  const keyPressEvents = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onCloseLastPanel();
    }
  };

  const registerEvents = () => {
    document.addEventListener("keydown", keyPressEvents);
  };

  const unRegisterEvents = () => {
    document.removeEventListener("keydown", keyPressEvents);
  };

  useEffect(() => {
    stacks.register();
    registerEvents();
    return () => {
      unRegisterEvents();
    };
  }, []);

  return (
    <ReactStackContext.Provider
      value={{
        stacks: [],
        stackStore: stacks,
        history: historyStore,
        stackMethods: {
          register: registerStack,
          unRegister: unRegisterStack,
          closeAll,
          closeLast: onCloseLastPanel,
          getStack,
          getPanel,
          getPanelFromStackName,
          open: openPanel,
          close: onClose,
        },
      }}
    >
      {children}
      {createPortal(
        <div data-stack-root="true" id="stack-panel-root">
          <HistoryComponent />
        </div>,
        document.body
      )}
    </ReactStackContext.Provider>
  );
}
