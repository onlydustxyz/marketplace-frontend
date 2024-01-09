import { cn } from "src/utils/cn.ts";
import { ThumbnailGroupProps } from "@/components/ds/thumbnail-group/thumbnail-group.type.ts";

import { Thumbnail } from "@/components/ds/thumbnail";
import { thumbnailGroupVariant } from "@/components/ds/thumbnail-group/thumbnail-group.variant.ts";

export function ThumbnailGroup({ thumbnails, className, defaultSrc = true, ...props }: ThumbnailGroupProps) {
  return (
    <div className={cn(thumbnailGroupVariant({ ...props }), className)}>
      {thumbnails.map((thumbnail, index) => (
        <Thumbnail key={`thumbnail-${index}`} {...thumbnail} {...props} defaultSrc={defaultSrc} />
      ))}
    </div>
  );
}

export default ThumbnailGroup;
