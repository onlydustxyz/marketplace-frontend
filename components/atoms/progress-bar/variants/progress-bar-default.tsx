import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { ProgressBarNextUiAdapter } from "../adapters/default/next-ui.adapter";
import { ProgressBarPort } from "../progress-bar.types";

export function ProgressBar<C extends ElementType = "div">(props: ProgressBarPort<C>) {
  return withComponentAdapter<ProgressBarPort<C>>(ProgressBarNextUiAdapter)(props);
}
