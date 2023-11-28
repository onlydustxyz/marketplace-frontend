import { RefSubscriptionInterface } from "../../react-subscriber/types/RefSubscription";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type anyType = any;

export type StacksParams = { [key: string]: anyType };
export type AnyParams = anyType;

export type StackPosition = "front" | "back" | "hidden" | "front-stacked";
export interface renderChildren<P extends StacksParams = StacksParams> {
  params: P;
}
export interface StackOptionalInterface<P extends StacksParams = StacksParams> {
  children: (props: renderChildren<P>) => React.ReactElement;
  name: string;
  open?: boolean;
  position?: StackPosition;
}

export interface StackPanelInterface<P extends StacksParams = StacksParams> {
  children: (props: renderChildren<P>) => React.ReactElement;
  open: boolean;
  id: string;
  position: StackPosition;
  name: string;
  params: P;
}

export interface StackInterface<P extends StacksParams = StacksParams> {
  name: string;
  defaultPanelId: string;
  defaultPanel: RefSubscriptionInterface<StackPanelInterface<P>>;
  panels: {
    [key: string]: RefSubscriptionInterface<StackPanelInterface<P>>;
  };
}

export interface StacksInterface<P extends StacksParams = StacksParams> {
  [key: string]: RefSubscriptionInterface<StackInterface<P>>;
}

export type RegisterStackProps<P extends StacksParams> = StackOptionalInterface<P>;
