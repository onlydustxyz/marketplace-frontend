import { PropsWithAdapter } from "components/types/props-with-adapter";

import { AccordionPort } from "./accordion.types";

export function AccordionCore({ Adapter, ...props }: PropsWithAdapter<AccordionPort>) {
  return <Adapter {...props} />;
}
