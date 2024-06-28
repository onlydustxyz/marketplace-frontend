import { CheckboxNextUiAdapter } from "components/atoms/checkbox/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { CheckboxPort } from "../checkbox.types";

export function Checkbox(props: CheckboxPort) {
  return withComponentAdapter<CheckboxPort>(CheckboxNextUiAdapter)(props);
}
