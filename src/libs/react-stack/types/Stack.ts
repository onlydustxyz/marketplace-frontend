import { ReactElement } from "react-markdown/lib/react-markdown";

import { RefSubscriptionInterface } from "../../react-subscriber/types/RefSubscription";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type anyType = any;
export type StacksParams = {
  [key: string]: anyType;
  panelProps?: {
    action?: ReactElement;
    topLeftComponent?: ReactElement;
  };
};
export type AnyParams = anyType;

/**
 * Represents the position of a stack element.
 * Possible values are "front", "back", "hidden", and "front-stacked".
 */
export type StackPosition = "front" | "back" | "hidden" | "front-stacked";

/**
 * Represents a function that renders children with specified parameters.
 * @template P - The type of the parameters.
 * @param {P} params - The parameters for rendering the children.
 */
export interface renderChildren<P extends StacksParams = StacksParams> {
  params: P;
}
/**
 * Represents an optional stack interface.
 * @template P - The type of the stack parameters.
 */
export interface StackOptionalInterface<P extends StacksParams = StacksParams> {
  /**
   * A function that renders the children of the stack.
   * @param props - The props for rendering the children.
   * @returns The rendered React element.
   */
  children: (props: renderChildren<P>) => React.ReactElement;
  /**
   * The name of the stack.
   */
  name: string;
  /**
   * Indicates whether the stack is open or not.
   */
  open?: boolean;
  /**
   * The position of the stack.
   */
  position?: StackPosition;
}

/**
 * Represents the interface for a stack panel.
 * @template P - The type of the stack panel's parameters.
 */
export interface StackPanelInterface<P extends StacksParams = StacksParams> {
  /**
   * A function that renders the children of the stack.
   * @param props - The props for rendering the children.
   * @returns The rendered React element.
   */
  children: (props: renderChildren<P>) => React.ReactElement;
  /**
   * Indicates whether the stack is open or not.
   */
  open: boolean;
  /**
   * The name of the stack panel.
   */
  id: string;
  /**
   * The position of the stack panel 'front' | 'back' 'front-stacked' | 'hidden'.
   */
  position: StackPosition;
  /**
   * The name of the stack.
   */
  name: string;
  /**
   * The params needed by the panel
   */
  params: P;
}

/**
 * Represents a stack of panels in a React application.
 * @template P - The type of the stack parameters.
 */
export interface StackInterface<P extends StacksParams = StacksParams> {
  name: string;
  defaultPanelId: string;
  defaultPanel: RefSubscriptionInterface<StackPanelInterface<P>>;
  panels: {
    [key: string]: RefSubscriptionInterface<StackPanelInterface<P>>;
  };
}

/**
 * Interface representing a collection of stacks.
 * @template P - The type of the stack parameters.
 */
export interface StacksInterface<P extends StacksParams = StacksParams> {
  [key: string]: RefSubscriptionInterface<StackInterface<P>>;
}

/**
 * Registers a stack with the specified props.
 * @template P - The type of the stack parameters.
 * @param {P} props - The props for the stack.
 * @returns {StackOptionalInterface<P>} - The registered stack props.
 */
export type RegisterStackProps<P extends StacksParams> = StackOptionalInterface<P> & { unRegisterOnUnMount?: boolean };

export interface Options {
  panel: {
    noPadding?: boolean;
    theme?: "light" | "dark" | "new";
  };
}
