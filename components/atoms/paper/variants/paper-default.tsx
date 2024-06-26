import { ElementType } from "react";

import { PaperDefaultAdapter } from "components/atoms/paper/adapters/default/default.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { PaperPort } from "../paper.types";

export function Paper<C extends ElementType = "article">(props: PaperPort<C>) {
  return withComponentAdapter<PaperPort<C>>(PaperDefaultAdapter)(props);
}
