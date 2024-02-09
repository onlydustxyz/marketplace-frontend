import { cn } from "src/utils/cn";

import { TAvatar } from "components/ds/avatar/avatar.types";
import { avatarVariants } from "components/ds/avatar/avatar.variants";
import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function AvatarLoading({ skeletonProps = {}, animate = true, className, ...props }: TAvatar.LoadingProps) {
  return (
    <div
      className={cn(
        avatarVariants(props),
        {
          "border-spaceBlue-800": skeletonProps?.color !== "grey",
          "border-greyscale-800": skeletonProps?.color === "grey",
          "animate-none": !animate,
          "animate-pulse": animate,
        },
        className
      )}
    >
      <SkeletonEl variant="rectangular" width="100%" height="100%" className="animate-none" {...skeletonProps} />
    </div>
  );
}
