import { ElementType } from "react";

import { PropsWithAdapter } from "components/types/props-with-adapter";

import { AccordionPort } from "./accordion.types";

export function AccordionCore<C extends ElementType = "div">({
  Adapter,
  ...props
}: PropsWithAdapter<AccordionPort<C>>) {
  return <Adapter {...props} />;
}
