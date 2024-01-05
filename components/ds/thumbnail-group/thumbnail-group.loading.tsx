import { ThumbnailGroupLoadingProps } from "./thumbnail-group.type.ts";
import { cn } from "../../../src/utils/cn.ts";
import { thumbnailGroupVariant } from "@/components/ds/thumbnail-group/thumbnail-group.variant.ts";
import React from "react";
import ThumbnailLoading from "@/components/ds/thumbnail/thumbnail.loading.tsx";
export function ThumbnailGroupLoading({ skeletonProps, className, ...props }: ThumbnailGroupLoadingProps) {
  return (
    <div className={cn(thumbnailGroupVariant({ ...props }), "animate-pulse", className)}>
      <ThumbnailLoading {...props} animate={false} />
      <ThumbnailLoading {...props} animate={false} />
      <ThumbnailLoading {...props} animate={false} />
    </div>
  );
}

export default ThumbnailGroupLoading;
