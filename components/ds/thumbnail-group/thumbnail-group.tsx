import { cn } from "src/utils/cn.ts";
import { TThumbnailGroup } from "@/components/ds/thumbnail-group/thumbnail-group.types";

import { Thumbnail } from "@/components/ds/thumbnail/thumbnail";
import { thumbnailGroupVariants } from "@/components/ds/thumbnail-group/thumbnail-group.variants";

export function ThumbnailGroup({ thumbnails, className, defaultSrc = true, ...props }: TThumbnailGroup.Props) {
  return (
    <div className={cn(thumbnailGroupVariants({ ...props }), className)}>
      {thumbnails.map((thumbnail, index) => (
        <Thumbnail key={`thumbnail-${index}`} {...thumbnail} {...props} defaultSrc={defaultSrc} />
      ))}
    </div>
  );
}
