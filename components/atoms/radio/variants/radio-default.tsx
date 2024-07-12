import { ElementType } from "react";

import { RadioNextUiAdapter } from "components/atoms/radio/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { RadioPort } from "../radio.types";

export function Radio<V extends string, C extends ElementType = "div">(props: RadioPort<V, C>) {
  return withComponentAdapter<RadioPort<V, C>>(RadioNextUiAdapter)(props);
}
