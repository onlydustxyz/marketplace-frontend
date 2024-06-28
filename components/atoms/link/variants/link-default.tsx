import { LinkDefaultAdapter } from "components/atoms/link/adapters/default/default.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { LinkPort } from "../link.types";

export function Link(props: LinkPort) {
  return withComponentAdapter<LinkPort>(LinkDefaultAdapter)(props);
}
