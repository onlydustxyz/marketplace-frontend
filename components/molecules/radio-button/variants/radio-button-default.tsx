import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { RadioButtonDefaultAdapter } from "../adapters/default/default.adapter";
import { RadioButtonPort } from "../radio-button.types";

export function RadioButton<V extends string>(props: RadioButtonPort<V>) {
  return withComponentAdapter<RadioButtonPort<V>>(RadioButtonDefaultAdapter)(props);
}
