import { PopoverContentPort, PopoverPort, PopoverTriggerPort } from "components/atoms/popover/popover.types";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { PopoverNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function Popover(props: PopoverPort) {
  return withComponentAdapter(PopoverNextUiAdapter)(props);
}

Popover.Trigger = function PopoverTrigger(props: PopoverTriggerPort) {
  return withComponentAdapter(PopoverNextUiAdapter.Trigger)(props);
};

Popover.Content = function PopoverContent(props: PopoverContentPort) {
  return withComponentAdapter(PopoverNextUiAdapter.Content)(props);
};
