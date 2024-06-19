import { ElementType } from "react";

import { BadgeDefaultAdapter } from "components/atoms/badge/adapters/default/default.adapter";
import { BadgeCore } from "components/atoms/badge/badge.core";

import { BadgePort } from "../badge.types";

export function Badge<C extends ElementType = "div">({ ...props }: BadgePort<C>) {
  return <BadgeCore Adapter={BadgeDefaultAdapter} {...props} />;
}
