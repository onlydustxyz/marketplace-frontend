import { ElementType } from "react";

import { AvatarLoading } from "components/atoms/avatar/avatar.loading";

import { AvatarGroupDefaultVariants } from "./adapters/default/default.variants";
import { AvatarGroupPort } from "./avatar-group.types";

export function AvatarGroupLoading<C extends ElementType = "div">({
  size,
  shape,
}: Omit<AvatarGroupPort<C>, "avatars">) {
  const slots = AvatarGroupDefaultVariants({
    size,
  });

  return (
    <div className={slots.base()}>
      <AvatarLoading size={size} shape={shape} />
      <AvatarLoading size={size} shape={shape} />
      <AvatarLoading size={size} shape={shape} />
    </div>
  );
}
