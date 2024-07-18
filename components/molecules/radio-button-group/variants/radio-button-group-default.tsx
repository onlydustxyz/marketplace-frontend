import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { RadioButtonGroupDefaultAdapter } from "../adapters/default/default.adapter";
import { RadioGroupButtonPort } from "../radio-button-group.types";

export function RadioButtonGroup<V extends string>(props: RadioGroupButtonPort<V>) {
  return withComponentAdapter<RadioGroupButtonPort<V>>(RadioButtonGroupDefaultAdapter)(props);
}
