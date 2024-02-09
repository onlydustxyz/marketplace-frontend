import { EventEmitter } from "events";
import { useEffect, useRef } from "react";

import { Events } from "./types/Event";
import { RefSubscriptionInterface, RefSubscriptionSubscriberInterface } from "./types/RefSubscription";

/**
 * Custom hook that creates a subscription to a value using useRef.
 * @views T The type of the value being subscribed to.
 * @param {T} value The initial value of the subscription.
 * @returns {[RefSubscriptionInterface<T>, (newvalue: T | ((prev: T) => T)) => void]} An array containing the subscription object and a function to update the value.
 */
export const useRefSubscription = <T>(
  value: T
): [RefSubscriptionInterface<T>, (newvalue: T | ((prev: T) => T)) => void] => {
  const store = useRef<RefSubscriptionInterface<T>>({
    state: value,
    emitter: new EventEmitter(),
    registerd: false,
    on: (event, callback) => {
      store.current.emitter?.on?.(event, callback);
    },
    off: (event, callback) => {
      store.current.emitter?.off?.(event, callback);
    },
    emit: (event, data) => {
      store.current.emitter?.emit?.(event, data);
    },
    setValue: (newvalue: T | ((prev: T) => T)) => {
      if (typeof newvalue === "function") {
        const getState = newvalue as (prev: T) => T;
        store.current.state = getState(store.current.state);
      } else {
        store.current.state = newvalue;
      }
      store.current?.emit?.(Events.ALL, store.current.state);
      store.current?.emit?.(Events.UPDATE, store.current.state);
    },
    register: (callback?: RefSubscriptionSubscriberInterface<T>) => {
      if (store.current.registerd) {
        callback?.(store.current.state);
      }
      store.current.registerd = true;
      store.current.emit(Events.ALL, store.current.state);
      store.current.emit(Events.REGISTER, store.current.state);
      callback?.(store.current.state);
    },
  });

  useEffect(() => {
    if (store) {
      store.current.register();
    }
  }, [store]);

  return [store.current, store.current.setValue];
};
