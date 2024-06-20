import { ElementType } from "react";

import { PropsWithAdapter } from "components/types/props-with-adapter";

import { ModalPort } from "./modal.types";

export function ModalCore<C extends ElementType = "div">({
  Adapter,
  canDismiss = true,
  ...props
}: PropsWithAdapter<ModalPort<C>>) {
  return <Adapter {...props} canDismiss={canDismiss} />;
}
