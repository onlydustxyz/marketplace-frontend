import { ElementType } from "react";

import { BadgeDefaultAdapter } from "components/atoms/badge/adapters/default/default.adapter";

import { BadgeCore } from "../badge.core";
import { BadgeDotPortDot } from "../badge.types";

export function BadgeDot<C extends ElementType = "div">(props: BadgeDotPortDot<C>) {
  return (
    <BadgeCore
      Adapter={BadgeDefaultAdapter}
      {...props}
      hideContent={true}
      classNames={{
        base: "h-2 w-2 rounded-full p-0",
      }}
    />
  );
}
