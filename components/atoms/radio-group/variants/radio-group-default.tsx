import { ElementType } from "react";

import { RadioGroupNextUiAdapter } from "components/atoms/radio-group/adapters/next-ui/next-ui.adapter";
import { RadioGroupPort } from "components/atoms/radio-group/radio-group.types";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

export function RadioGroup<V extends string, C extends ElementType = "div">(props: RadioGroupPort<V, C>) {
  return withComponentAdapter<RadioGroupPort<V, C>>(RadioGroupNextUiAdapter)(props);
}
