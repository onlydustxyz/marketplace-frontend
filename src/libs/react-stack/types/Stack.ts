import { MutableRefObject } from "react";
import { RefSubscriptionInterface } from "../../react-subscriber/types/RefSubscription";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StacksParams = { [key: string]: any };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyParams = any;
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

export type UpdateStackInterface = {
  open: boolean;
};

export interface StacksInterface<P extends StacksParams = StacksParams> {
  [key: string]: RefSubscriptionInterface<StackInterface<P>>;
}

export type StackRefInterface = MutableRefObject<StackInterface>;
export type StacksRefInterface = MutableRefObject<StacksInterface>;
