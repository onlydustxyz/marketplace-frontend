import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { HelperDefaultAdapter } from "../adapters/default/default.adapter";
import { HelperPort } from "../helper.types";

export function Helper<C extends ElementType = "div">(props: HelperPort<C>) {
  return withComponentAdapter<HelperPort<C>>(HelperDefaultAdapter)(props);
}
