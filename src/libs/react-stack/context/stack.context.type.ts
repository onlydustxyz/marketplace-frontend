import { RefSubscriptionInterface } from "src/libs/react-subscriber";

import { AnyParams, StackInterface, StackPanelInterface, StacksInterface, StacksParams } from "../types/Stack";

export interface reactStackContextProps {
  children: React.ReactNode;
}

export type panelEvent = "open" | "close";

export interface HistoryStore {
  name: string;
  panelId: string;
  params?: StacksParams;
}

export type IReactStackContext = {
  stacks: [];
  stackStore: RefSubscriptionInterface<StacksInterface>;
  history: RefSubscriptionInterface<HistoryStore[]>;
  stackMethods: {
    closeAll: () => void;
    register: (stack: RefSubscriptionInterface<StackInterface<AnyParams>>) => void;
    unRegister: (name: string) => void;
    getStack: (name: string) => RefSubscriptionInterface<StackInterface<AnyParams>> | null;
    getPanel: (name: string, id: string) => RefSubscriptionInterface<StackPanelInterface> | null;
    getPanelFromStackName: (name: string) => {
      panel: RefSubscriptionInterface<StackPanelInterface<StacksParams>>;
      stack: RefSubscriptionInterface<StackInterface<StacksParams>>;
      id: string;
    };
    open: (name: string, params?: StacksParams) => void;
    close: (name?: string, panelId?: string) => void;
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
  newHistoryStore: HistoryStore[];
}
