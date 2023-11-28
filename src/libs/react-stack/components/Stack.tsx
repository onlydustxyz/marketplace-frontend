import { useMemo } from "react";
import { Panel } from "./Panel";
import { RefSubscriptionInterface, useSubscribe } from "src/libs/react-subscriber";
import { StackInterface, StacksParams } from "../types/Stack";

export interface StackProps<P extends StacksParams> {
  stackRef: RefSubscriptionInterface<StackInterface<P>>;
}

export const Stack = <P extends StacksParams>({ stackRef }: StackProps<P>) => {
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
