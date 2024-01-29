import { cn } from "src/utils/cn";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { thumbnailVariants } from "components/ds/thumbnail/thumbnail.variants";

import { TThumbnail } from "./thumbnail.types";

export function ThumbnailLoading({ skeletonProps, animate = true, className, ...props }: TThumbnail.LoadingProps) {
  return (
    <div
      className={cn(
        thumbnailVariants({ ...props }),
        {
          "border-spaceBlue-800": skeletonProps?.color !== "grey",
          "border-greyscale-800": skeletonProps?.color === "grey",
          "animate-none": !animate,
          "animate-pulse": animate,
        },
        className
      )}
    >
      <SkeletonEl
        variant="rectangular"
        width="100%"
        height="100%"
        {...(skeletonProps || {})}
        className="animate-none"
      />
    </div>
  );
}
