import { RefSubscriptionInterface, useSubscribe } from "src/libs/react-subscriber";
import { StackPanelInterface, StacksParams } from "../types/Stack";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SidePanel from "../ui/Panel";
import useStackContext from "../hooks/useStackContext";

export interface PanelProps<P extends StacksParams> {
  panelRef: RefSubscriptionInterface<StackPanelInterface<P>>;
}

export const Panel = <P extends StacksParams>({ panelRef }: PanelProps<P>) => {
  const {
    stackMethods: { closeLast },
  } = useStackContext();
  const panel = useSubscribe(panelRef || undefined);
  const [domContainer, setDomContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (panel?.open) {
      const domElement = document.getElementById(`stack-panel-history-item-${panel.name}-${panel.id}`);
      if (domElement) {
        setDomContainer(domElement);
      }
    }
  }, [panel]);

  if (domContainer) {
    return createPortal(
      <SidePanel
        open={panel?.open || false}
        close={closeLast}
        back={panel?.position === "back"}
        front={panel?.position === "front" || panel?.position === "front-stacked"}
        stacked={panel?.position === "front-stacked"}
      >
        {panelRef.state.children({ params: panelRef.state.params })}
      </SidePanel>,
      domContainer
    );
  }
  return <></>;
};
