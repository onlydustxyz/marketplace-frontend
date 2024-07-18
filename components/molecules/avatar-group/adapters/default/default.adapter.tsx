import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Avatar } from "components/atoms/avatar";

import { AvatarGroupPort } from "../../avatar-group.types";
import { AvatarGroupDefaultVariants } from "./default.variants";

export function AvatarGroupDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  avatars,
  maxAvatars,
  size,
  shape,
  container,
  showFallback = true,
}: AvatarGroupPort<C>) {
  const Component = as || "div";
  const slots = AvatarGroupDefaultVariants({
    size,
  });

  const slicedAvatars = maxAvatars ? avatars.slice(0, maxAvatars) : avatars;

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {slicedAvatars.map((avatar, index) => (
        <Avatar
          key={`avatar-${index}`}
          src={avatar.src}
          name={avatar.name}
          size={size}
          shape={shape}
          container={container}
          showFallback={showFallback}
          classNames={{
            base: "transition-transform hover:-translate-x-1/4 hover:last:translate-x-0",
          }}
        />
      ))}

      {maxAvatars && avatars.length > maxAvatars ? (
        <Avatar
          name={`+${avatars.length - maxAvatars}`}
          size={size}
          shape={shape}
          container={container}
          showFallback={showFallback}
          classNames={{
            base: "transition-transform hover:-translate-x-1/4 hover:last:translate-x-0",
          }}
        />
      ) : null}
    </Component>
  );
}
