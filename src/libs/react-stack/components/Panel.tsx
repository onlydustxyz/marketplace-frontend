import { RefSubscriptionInterface, useSubscribe } from "src/libs/react-subscriber";
import { StackPanelInterface } from "../types/Stack";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SidePanel from "../ui/Panel";
import UseStackContext from "../hooks/useStackContext";

export interface PanelProps {
  panelRef: RefSubscriptionInterface<StackPanelInterface>;
}

export const Panel = ({ panelRef }: PanelProps) => {
  const {
    stackMethods: { closeLast },
  } = UseStackContext();
  const panel = useSubscribe(panelRef || undefined);
  const [domContainer, setDomContainer] = useState<HTMLElement | null>(null);

  const onClose = () => {
    console.log("should close", panel?.name, panel?.id);
    closeLast();
  };
  useEffect(() => {
    if (panel?.open) {
      const domElement = document.getElementById(`stack-panel-history-item-${panel.name}-${panel.id}`);
      if (domElement) {
        setDomContainer(domElement);
      }
      console.log("domElement", domElement);
    }
  }, [panel]);

  if (domContainer) {
    return createPortal(
      <SidePanel
        open={panel?.open || false}
        close={onClose}
        back={panel?.position === "back"}
        front={panel?.position === "front"}
      >
        {panelRef.state.children}
      </SidePanel>,
      domContainer
    );
  }
  return <></>;
};
