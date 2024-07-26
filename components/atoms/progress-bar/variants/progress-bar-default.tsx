import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { ProgressBarNextUiAdapter } from "../adapters/default/next-ui.adapter";
import { ProgressBarPort } from "../progress-bar.types";

export function ProgressBar(props: ProgressBarPort) {
  return withComponentAdapter<ProgressBarPort>(ProgressBarNextUiAdapter)(props);
}
