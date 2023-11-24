import EventEmitter from 'events'
import { Events } from './Event'

export type RefSubscriptionSubscriberInterface<TRef> = (value: TRef) => void

export interface RefSubscriptionInterface<TRef> {
  state: TRef
  emitter: EventEmitter
  registerd: boolean
  on: (event: Events, callback: RefSubscriptionSubscriberInterface<TRef>) => void
  off: (event: Events, callback: RefSubscriptionSubscriberInterface<TRef>) => void
  emit: (event: Events, data: TRef) => void
  setValue: (newvalue: TRef | ((prev: TRef) => TRef)) => void
  register: (callback?: RefSubscriptionSubscriberInterface<TRef>) => void
}
