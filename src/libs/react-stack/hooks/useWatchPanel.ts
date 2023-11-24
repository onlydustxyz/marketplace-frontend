import UseStackContext from "./useStackContext";
import { useSubscribe } from "../../react-subscriber/useSubscribe";
import { useEffect, useState } from "react";
import { RefSubscriptionInterface } from "../../react-subscriber/types/RefSubscription";
import { StackPanelInterface, StacksInterface } from "../types/Stack";
import { Events } from "src/libs/react-subscriber";

export interface UseWatchProps {
  panelName: string;
  panelId: string;
}

const UseWatchPanel = (panelName: string, panelId: string) => {
  const {
    stackStore,
    stackMethods: { getPanel },
  } = UseStackContext();
  const [canWatch, setCanWatch] = useState<RefSubscriptionInterface<StackPanelInterface> | null>(null);
  const stack = useSubscribe(canWatch || undefined);

  const watchStore = (data: StacksInterface) => {
    if (!canWatch && data[panelName]) {
      console.log("panel", data[panelName]);
      setCanWatch(getPanel(panelName, panelId) as RefSubscriptionInterface<StackPanelInterface> | null);
    }
  };

  useEffect(() => {
    stackStore?.on?.(Events.REGISTER, watchStore);
    return () => {
      stackStore?.off?.(Events.REGISTER, watchStore);
    };
  }, []);

  return stack;
};

export default UseWatchPanel;
