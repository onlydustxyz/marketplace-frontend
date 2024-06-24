import { CheckboxNextUiAdapter } from "components/atoms/checkbox/adapters/next-ui/next-ui.adapter";

import { CheckboxCore } from "../checkbox.core";
import { CheckboxPort } from "../checkbox.types";

export function Checkbox(props: CheckboxPort) {
  return <CheckboxCore Adapter={CheckboxNextUiAdapter} {...props} />;
}
