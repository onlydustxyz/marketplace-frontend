import EventEmitter from "events";

import { Events } from "./Event";

/**
 * Represents the interface for a subscriber function in a reference subscription.
 * @views TRef The type of the reference value.
 * @param value The value of the reference.
 */
export type RefSubscriptionSubscriberInterface<TRef> = (value: TRef) => void;

/**
 * Represents a subscription to a reference value.
 * @views TRef - The type of the reference value.
 */
export interface RefSubscriptionInterface<TRef> {
  state: TRef;
  emitter: EventEmitter;
  registerd: boolean;
  /**
   * Adds a callback function to be executed when the specified event is emitted.
   * @param event - The event name.
   * @param callback - The callback function to be executed.
   */
  on: (event: Events, callback: RefSubscriptionSubscriberInterface<TRef>) => void;
  /**
   * Removes a callback function from the specified event.
   * @param event - The event name.
   * @param callback - The callback function to be removed.
   */
  off: (event: Events, callback: RefSubscriptionSubscriberInterface<TRef>) => void;
  /**
   * Emits the specified event with the given data.
   * @param event - The event name.
   * @param data - The data to be passed to the event subscribers.
   */
  emit: (event: Events, data: TRef) => void;
  /**
   * Sets the value of the reference.
   * @param newvalue - The new value to be set or a function that receives the previous value and returns the new value.
   */
  setValue: (newvalue: TRef | ((prev: TRef) => TRef)) => void;
  /**
   * Registers the subscription.
   * @param callback - An optional callback function to be executed after the registration.
   */
  register: (callback?: RefSubscriptionSubscriberInterface<TRef>) => void;
}
