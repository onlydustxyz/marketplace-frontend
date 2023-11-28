import { MutableRefObject } from "react"
import { RefSubscriptionInterface } from "../../react-subscriber/types/RefSubscription"

export type StacksParams = object | undefined
export type StackPosition = "front" | "back" | "hidden" | "front-stacked"
export interface renderChildren {
    params: StacksParams
}
export interface StackOptionalInterface {
  children: (props: renderChildren) => React.ReactElement
  name: string
  open?: boolean
  position?: StackPosition
}

export interface StackPanelInterface {
  children: (props: renderChildren) => React.ReactElement
  open: boolean
  id: string
  position: StackPosition
  name: string
  params?: StacksParams
}

export interface StackInterface {
    name: string
    defaultPanelId: string
    defaultPanel: RefSubscriptionInterface<StackPanelInterface>
    panels: {
      [key: string]: RefSubscriptionInterface<StackPanelInterface>
    }
}

export type UpdateStackInterface = {
    open: boolean
}

export interface StacksInterface {
  [key: string]: RefSubscriptionInterface<StackInterface>
}

export type StackRefInterface = MutableRefObject<StackInterface>
export type StacksRefInterface = MutableRefObject<StacksInterface>
