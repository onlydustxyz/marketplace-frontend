import { cn } from "src/utils/cn";

import { TAvatarGroup } from "components/ds/avatar-group/avatar-group.types";
import { avatarGroupVariants } from "components/ds/avatar-group/avatar-group.variants";
import { AvatarLoading } from "components/ds/avatar/avatar.loading";

export function AvatarGroupLoading({ skeletonProps, className, ...props }: TAvatarGroup.LoadingProps) {
  return (
    <div className={cn(avatarGroupVariants(props), "animate-pulse", className)}>
      <AvatarLoading {...props} skeletonProps={skeletonProps} animate={false} />
      <AvatarLoading {...props} skeletonProps={skeletonProps} animate={false} />
      <AvatarLoading {...props} skeletonProps={skeletonProps} animate={false} />
    </div>
  );
}
