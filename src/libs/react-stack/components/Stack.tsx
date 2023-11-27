import { useMemo } from "react";
import { Panel } from "./Panel";
import { RefSubscriptionInterface, useSubscribe } from "src/libs/react-subscriber";
import { StackInterface } from "../types/Stack";

export interface StackProps {
  stackRef: RefSubscriptionInterface<StackInterface>;
}

export const Stack = ({ stackRef }: StackProps) => {
  const stack = useSubscribe(stackRef || undefined);
  const panelsKeys = useMemo(() => Object.keys(stack?.panels || []), [stack]);

  if (stack?.panels) {
    return (
      <>
        {panelsKeys.map(panelId => (
          <Panel key={panelId} panelRef={stack.panels[panelId]} />
        ))}
      </>
    );
  }
  return <div>name: {stack?.name}</div>;
};
