import { RefSubscriptionInterface, useSubscribe } from "src/libs/react-subscriber";
import { StackPanelInterface } from "../types/Stack";

export interface PanelProps {
  panelRef: RefSubscriptionInterface<StackPanelInterface>;
}

export const Panel = ({ panelRef }: PanelProps) => {
  const panel = useSubscribe(panelRef || undefined);
  //   console.log("panelRef", panelRef);
  //   console.log("panel", panel);
  return (
    <div>
      name: {panel?.name}
      id: {panel?.id}
    </div>
  );
};
