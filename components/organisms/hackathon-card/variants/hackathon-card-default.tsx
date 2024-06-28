import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { HackathonCardDefaultAdapter } from "../adapters/default/default.adapter";
import { HackathonCardPort } from "../hackathon-card.types";

export function HackathonCard<C extends ElementType = "div">(props: HackathonCardPort<C>) {
  return withComponentAdapter<HackathonCardPort<C>>(HackathonCardDefaultAdapter)(props);
}
