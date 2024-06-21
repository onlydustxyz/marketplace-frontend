import { AccordionCore } from "../accordion.core";
import { AccordionPort } from "../accordion.types";
import { AccordionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function Accordion({ ...props }: AccordionPort) {
  return <AccordionCore Adapter={AccordionNextUiAdapter} {...props} />;
}
