import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { AccordionPort } from "../accordion.types";
import { AccordionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function Accordion(props: AccordionPort) {
  return withComponentAdapter<AccordionPort>(AccordionNextUiAdapter)(props);
}
