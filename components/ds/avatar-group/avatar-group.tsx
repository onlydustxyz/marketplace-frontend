import { cn } from "src/utils/cn";

import { TAvatarGroup } from "components/ds/avatar-group/avatar-group.types";
import { avatarGroupVariants } from "components/ds/avatar-group/avatar-group.variants";
import { Avatar } from "components/ds/avatar/avatar";

export function AvatarGroup({ avatars, avatarProps, className, ...props }: TAvatarGroup.Props) {
  return (
    <div className={cn(avatarGroupVariants({ ...props, size: avatarProps.size }), className)}>
      {avatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          {...avatarProps}
          className="transition-transform hover:-translate-x-1/4 hover:last:translate-x-0"
        />
      ))}
    </div>
  );
}
