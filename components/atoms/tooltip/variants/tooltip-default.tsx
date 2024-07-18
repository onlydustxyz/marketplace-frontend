import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { TooltipNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { TooltipPort } from "../tooltip.types";

export function Tooltip<C extends ElementType = "div">(props: TooltipPort<C>) {
  return withComponentAdapter<TooltipPort<C>>(TooltipNextUiAdapter)(props);
}
