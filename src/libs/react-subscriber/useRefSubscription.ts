import { useEffect, useRef } from "react";
import { RefSubscriptionInterface, RefSubscriptionSubscriberInterface } from "./types/RefSubscription";
import { EventEmitter } from "events";
import { Events } from "./types/Event";

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
