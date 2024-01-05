import { ThumbnailLoadingProps } from "./thumbnail.type.ts";
import { cn } from "../../../src/utils/cn.ts";
import { thumbnailVariant } from "@/components/ds/thumbnail/thumbnail.variant.ts";
import SkeletonEl from "@/components/ds/Skeleton/Skeleton.tsx";
export function ThumbnailLoading({ skeletonProps, animate = true, className, ...props }: ThumbnailLoadingProps) {
  return (
    <div
      className={cn(
        thumbnailVariant({ ...props }),
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

export default ThumbnailLoading;
