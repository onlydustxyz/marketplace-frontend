import { useCallback, useEffect, useState } from "react";
import { RefSubscriptionInterface } from "./types/RefSubscription";
import { Events } from "./types/Event";

export const useSubscribe = <TRef>(ref?: RefSubscriptionInterface<TRef>, event: Events = Events.ALL) => {
  const [state, setState] = useState<TRef | undefined>(undefined);

  const subscriberCallback = useCallback(
    (value: TRef) => {
      setState(value);
    },
    [state]
  );

  const registerCallback = useCallback(
    (value: TRef) => {
      setState(value);
    },
    [state]
  );

  useEffect(() => {
    if (ref) {
      ref.on(event, subscriberCallback);
      ref.on(Events.REGISTER, registerCallback);
      ref.register();
      return () => {
        ref.off(event, subscriberCallback);
        ref.off(Events.REGISTER, registerCallback);
      };
    }
  }, [ref]);

  return state;
};
