import { PropsWithAdapter } from "components/types/props-with-adapter";

import { ModalPort } from "./modal.types";

export function ModalCore({ Adapter, canDismiss = true, ...props }: PropsWithAdapter<ModalPort>) {
  return <Adapter {...props} canDismiss={canDismiss} />;
}
