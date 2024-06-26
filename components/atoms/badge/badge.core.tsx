import { ElementType } from "react";

import { PropsWithAdapter } from "components/types/props-with-adapter";

import { BadgePort } from "./badge.types";

export function BadgeCore<C extends ElementType = "div">({ Adapter, ...props }: PropsWithAdapter<BadgePort<C>>) {
  return <Adapter {...props} />;
}
