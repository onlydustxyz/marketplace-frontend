import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { CardProjectDefaultAdapter } from "../adapters/default/default.adapter";
import { CardProjectPort } from "../card-project.types";

export function CardProject<C extends ElementType = "div">(props: CardProjectPort<C>) {
  return withComponentAdapter<CardProjectPort<C>>(CardProjectDefaultAdapter)(props);
}
