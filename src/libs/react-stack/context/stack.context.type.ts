import { RefSubscriptionInterface } from "src/libs/react-subscriber";
import { AnyParams, StackInterface, StackPanelInterface, StacksInterface, StacksParams } from "../types/Stack";

export interface reactStackContextProps {
  children: React.ReactNode;
}

export type panelEvent = "open" | "close";

export interface History {
  name: string;
  panelId: string;
  params?: StacksParams;
}

export type IReactStackContext = {
  stacks: [];
  stackStore: RefSubscriptionInterface<StacksInterface>;
  history: RefSubscriptionInterface<History[]>;
  stackMethods: {
    closeAll: () => void;
    register: (stack: RefSubscriptionInterface<StackInterface<AnyParams>>) => void;
    getStack: (name: string) => RefSubscriptionInterface<StackInterface<AnyParams>> | null;
    getPanel: (name: string, id: string) => RefSubscriptionInterface<StackPanelInterface> | null;
    open: (name: string, params?: StacksParams) => void;
    close: (name: string, panelId: string) => void;
    closeLast: () => void;
  };
};

export type RegisterStack = RefSubscriptionInterface<StackInterface>;

export interface RegisterPanel {
  name: string;
  panelId: string;
  params?: StacksParams;
}

export interface UpdateHistory {
  name: string;
  panelId: string;
  event: panelEvent;
  params?: StacksParams;
}

export interface UpdatePanelOrder {
  history: History[];
}
