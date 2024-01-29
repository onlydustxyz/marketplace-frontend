import { useMemo } from "react";

import { RefSubscriptionInterface, useSubscribe } from "src/libs/react-subscriber";

import { Options, StackInterface, StacksParams } from "../types/Stack";
import { Panel } from "./Panel";

export interface StackProps<P extends StacksParams> {
  stackRef: RefSubscriptionInterface<StackInterface<P>>;
  option?: Options;
}

export const Stack = <P extends StacksParams>({ stackRef, option }: StackProps<P>) => {
  const stack = useSubscribe(stackRef || undefined);
  const panelsKeys = useMemo(() => Object.keys(stack?.panels || []), [stack]);

  if (stack?.panels) {
    return (
      <>
        {panelsKeys.map(panelId => (
          <Panel key={panelId} panelRef={stack.panels[panelId]} option={option?.panel} />
        ))}
      </>
    );
  }
  return null;
};
