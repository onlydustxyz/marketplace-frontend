import { MutableRefObject } from "react"
import { RefSubscriptionInterface } from "../../react-subscriber/types/RefSubscription"

export interface StackRouter {
  name: string

}

export type StackPosition = "front" | "back" | "hidden"

export interface StackOptionalInterface {
  children: React.ReactElement
  name: string
  open?: boolean
  position?: StackPosition
}

export interface StackInterface {
  children: React.ReactElement
  name: string
  open: boolean
  position: StackPosition
}

export type UpdateStackInterface = Partial<Omit<StackInterface, "name">>

export interface StacksInterface {
  [key: string]: RefSubscriptionInterface<StackInterface>
}

export type StackRefInterface = MutableRefObject<StackInterface>
export type StacksRefInterface = MutableRefObject<StacksInterface>
