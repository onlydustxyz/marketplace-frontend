import { createContext } from "react";
import { History, IReactStackContext } from "./stack.context.type";
import { RefSubscriptionInterface } from "src/libs/react-subscriber";
import { StacksInterface } from "../types/Stack";

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
