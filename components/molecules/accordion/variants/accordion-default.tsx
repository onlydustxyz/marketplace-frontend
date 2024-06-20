import { AccordionCore } from "../accordion.core";
import { AccordionPort } from "../accordion.types";
import { AccordionDefaultAdapter } from "../adapters/default/default.adapter";
import { ElementType } from "react";

export function Accordion<C extends ElementType = "div">({
  ...props
}: AccordionPort<C>) {
  return <AccordionCore Adapter={AccordionDefaultAdapter} {...props} />;
}
