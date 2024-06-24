import { ElementType } from "react";

import { BadgeCore } from "../badge.core";
import { TBadgeDotProps } from "../badge.types";

export function BadgeDot<C extends ElementType = "div">({ ...props }: TBadgeDotProps<C>) {
  return (
    <BadgeCore
      {...props}
      hideContent={true}
      classNames={{
        base: "h-2 w-2 rounded-full p-0",
      }}
    />
  );
}
