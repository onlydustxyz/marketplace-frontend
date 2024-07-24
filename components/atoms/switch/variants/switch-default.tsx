import { SwitchNextUiAdapter } from "components/atoms/switch/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { SwitchPort } from "../switch.types";

export function Switch(props: SwitchPort) {
  return withComponentAdapter<SwitchPort>(SwitchNextUiAdapter)(props);
}
