import { useMemo } from "react";

import { cn } from "src/utils/cn";

import { TAvatarGroup } from "components/ds/avatar-group/avatar-group.types";
import { avatarGroupVariants } from "components/ds/avatar-group/avatar-group.variants";
import { Avatar } from "components/ds/avatar/avatar";

export function AvatarGroup({ avatars, avatarProps, className, max = 3, ...props }: TAvatarGroup.Props) {
  const numberOfAvatars = useMemo(() => avatars.length, [avatars]);
  const avatarsMap = useMemo(() => (max ? avatars.slice(0, max) : avatars), [avatars, max]);

  return (
    <div className={cn(avatarGroupVariants({ ...props, size: avatarProps?.size }), className)}>
      {avatarsMap.map((avatar, index) => (
        <Avatar key={index} {...avatar} {...avatarProps} />
      ))}
      {max && numberOfAvatars > max ? (
        <div className="relative z-10 box-content h-4 w-4 rounded-full border border-greyscale-50/12 bg-greyscale-800 text-xs">
          + {numberOfAvatars - max}
        </div>
      ) : null}
    </div>
  );
}
