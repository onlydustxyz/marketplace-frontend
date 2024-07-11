import { CardEventDefaultAdapter } from "../adapters/default/default.adapter";
import { CardEventPort } from "../card-event.types";
import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { ElementType } from "react";

export function CardEvent<C extends ElementType = "div">(
  props: CardEventPort<C>
) {
  return withComponentAdapter<CardEventPort<C>>(CardEventDefaultAdapter)(props);
}
