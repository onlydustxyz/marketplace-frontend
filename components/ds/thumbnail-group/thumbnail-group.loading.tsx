import { TThumbnailGroup } from "./thumbnail-group.types";
import { cn } from "src/utils/cn";
import { thumbnailGroupVariants } from "components/ds/thumbnail-group/thumbnail-group.variants";

import { ThumbnailLoading } from "components/ds/thumbnail/thumbnail.loading";

export function ThumbnailGroupLoading({ skeletonProps, className, ...props }: TThumbnailGroup.LoadingProps) {
  return (
    <div className={cn(thumbnailGroupVariants({ ...props }), "animate-pulse", className)}>
      <ThumbnailLoading {...props} skeletonProps={skeletonProps} animate={false} />
      <ThumbnailLoading {...props} skeletonProps={skeletonProps} animate={false} />
      <ThumbnailLoading {...props} skeletonProps={skeletonProps} animate={false} />
    </div>
  );
}
