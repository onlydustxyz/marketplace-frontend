import { TThumbnailGroup } from "./thumbnail-group.types.ts";
import { cn } from "src/utils/cn.ts";
import { thumbnailGroupVariants } from "@/components/ds/thumbnail-group/thumbnail-group.variants.ts";

import { ThumbnailLoading } from "@/components/ds/thumbnail/thumbnail.loading.tsx";

export function ThumbnailGroupLoading({ skeletonProps, className, ...props }: TThumbnailGroup.LoadingProps) {
  return (
    <div className={cn(thumbnailGroupVariants({ ...props }), "animate-pulse", className)}>
      <ThumbnailLoading {...props} skeletonProps={skeletonProps} animate={false} />
      <ThumbnailLoading {...props} skeletonProps={skeletonProps} animate={false} />
      <ThumbnailLoading {...props} skeletonProps={skeletonProps} animate={false} />
    </div>
  );
}
