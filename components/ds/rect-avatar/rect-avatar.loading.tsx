import { cn } from "src/utils/cn";

import { TRectAvatar } from "components/ds/rect-avatar/rect-avatar.types";
import { rectAvatarVariants } from "components/ds/rect-avatar/rect-avatar.variants";
import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function RectAvatarLoading({
  skeletonProps = {},
  animate = true,
  className,
  ...props
}: TRectAvatar.LoadingProps) {
  return (
    <div
      className={cn(
        rectAvatarVariants(props),
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
