import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { AvatarGroupDefaultAdapter } from "../adapters/default/default.adapter";
import { AvatarGroupPort } from "../avatar-group.types";

export function AvatarGroup<C extends ElementType = "div">(props: AvatarGroupPort<C>) {
  return withComponentAdapter<AvatarGroupPort<C>>(AvatarGroupDefaultAdapter)(props);
}
