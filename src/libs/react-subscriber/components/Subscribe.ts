import { RefSubscriptionInterface } from "../types/RefSubscription";
import { useSubscribe } from "../useSubscribe";

export interface SubscribeProps<TRef> {
  to: RefSubscriptionInterface<TRef>;
  children: (subscriber: TRef) => JSX.Element;
}
export const Subscribe = <TRef>({ to, children }: SubscribeProps<TRef>) => {
  const subscriber = useSubscribe(to);

  return subscriber ? children(subscriber) : null;
};
