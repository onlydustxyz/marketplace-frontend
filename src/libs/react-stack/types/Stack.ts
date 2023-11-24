import { MutableRefObject } from "react"
import { RefSubscriptionInterface } from "../../react-subscriber/types/RefSubscription"

export interface StackRouter {
  name: string

}

export interface StackOptionalInterface {
  children: React.ReactElement
  name: string
  open?: boolean
  order?: number
}

export interface StackInterface {
  children: React.ReactElement
  name: string
  open: boolean
  order: number
}

export type UpdateStackInterface = Partial<Omit<StackInterface, "name">>

export interface StacksInterface {
  [key: string]: RefSubscriptionInterface<StackInterface>
}

export type StackRefInterface = MutableRefObject<StackInterface>
export type StacksRefInterface = MutableRefObject<StacksInterface>
