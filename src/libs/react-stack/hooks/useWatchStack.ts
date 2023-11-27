import UseStackContext from "./useStackContext";
import { useSubscribe } from "../../react-subscriber/useSubscribe";
import { useEffect, useState } from "react";
import { RefSubscriptionInterface } from "../../react-subscriber/types/RefSubscription";
import { StackInterface, StacksInterface } from "../types/Stack";
import { Events } from "src/libs/react-subscriber";

export interface UseWatchStackProps {
  name: string;
}

const UseWatchStack = (name: string) => {
  const {
    stackStore,
    stackMethods: { getStack },
  } = UseStackContext();
  const [canWatch, setCanWatch] = useState<RefSubscriptionInterface<StackInterface> | null>(null);
  const stack = useSubscribe(canWatch || undefined);

  const watchStore = (data: StacksInterface) => {
    if (!canWatch && data[name]) {
      setCanWatch(getStack(name) as RefSubscriptionInterface<StackInterface> | null);
    }
  };

  useEffect(() => {
    stackStore.on(Events.REGISTER, watchStore);
    return () => {
      stackStore.off(Events.REGISTER, watchStore);
    };
  }, []);

  return stack;
};

export default UseWatchStack;
