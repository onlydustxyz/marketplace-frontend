import { EventEmitter } from "events";

import { Events } from "./types/Event";
import { RefSubscriptionInterface, RefSubscriptionSubscriberInterface } from "./types/RefSubscription";

/**
 * Creates a subscription object with a reference to a value of type T.
 * The subscription object allows registering event listeners, emitting events, and updating the value.
 *
 * @template T - The type of the value.
 * @param value - The initial value.
 * @returns The subscription object.
 */
export const unsafeCreateRefSubscription = <T>(value: T): RefSubscriptionInterface<T> => {
  const store: RefSubscriptionInterface<T> = {
    state: value,
    emitter: new EventEmitter(),
    registerd: false,
    on: (event, callback) => {
      store.emitter?.on?.(event, callback);
    },
    off: (event, callback) => {
      store.emitter?.off?.(event, callback);
    },
    emit: (event, data) => {
      store.emitter?.emit?.(event, data);
    },
    setValue: (newvalue: T | ((prev: T) => T)) => {
      if (typeof newvalue === "function") {
        const getState = newvalue as (prev: T) => T;
        store.state = getState(store.state);
      } else {
        store.state = newvalue;
      }
      store.emit?.(Events.ALL, store.state);
      store.emit?.(Events.UPDATE, store.state);
    },
    register: (callback?: RefSubscriptionSubscriberInterface<T>) => {
      if (store.registerd) {
        callback?.(store.state);
      }
      store.registerd = true;
      store.emit?.(Events.ALL, store.state);
      store.emit?.(Events.REGISTER, store.state);
      callback?.(store.state);
    },
  };

  return store;
};
