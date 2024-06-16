import { ElementType } from "react";

import { BadgeCore } from "components/atoms/badge/badge.core";

import { TBadgeProps } from "../badge.types";

export function Badge<C extends ElementType = "div">({ ...props }: TBadgeProps<C>) {
  return <BadgeCore {...props} />;
}
