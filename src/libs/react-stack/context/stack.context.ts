import { createContext } from "react";

import { RefSubscriptionInterface } from "src/libs/react-subscriber";

import { StackInterface, StackPanelInterface, StacksInterface } from "../types/Stack";
import { HistoryStore, IReactStackContext } from "./stack.context.type";

export const ReactStackContext = createContext<IReactStackContext>({
  stacks: [],
  stackStore: {} as RefSubscriptionInterface<StacksInterface>,
  history: {} as RefSubscriptionInterface<HistoryStore[]>,
  stackMethods: {
    closeAll: () => null,
    register: () => null,
    unRegister: () => null,
    getStack: () => null,
    getPanel: () => null,
    getPanelFromStackName: () => {
      return {
        panel: {} as RefSubscriptionInterface<StackPanelInterface>,
        stack: {} as RefSubscriptionInterface<StackInterface>,
        id: "",
      };
    },
    open: () => null,
    close: () => null,
    closeLast: () => null,
  },
});
