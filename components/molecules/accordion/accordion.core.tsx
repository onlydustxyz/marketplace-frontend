import { PropsWithAdapter } from "components/types/props-with-adapter";

import { AccordionPort } from "./accordion.types";

export function AccordionCore({ Adapter, selectionMode = "single", ...props }: PropsWithAdapter<AccordionPort>) {
  return <Adapter {...props} selectionMode={selectionMode} />;
}
