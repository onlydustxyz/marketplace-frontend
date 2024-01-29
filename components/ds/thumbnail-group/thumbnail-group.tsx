import { cn } from "src/utils/cn";

import { TThumbnailGroup } from "components/ds/thumbnail-group/thumbnail-group.types";
import { thumbnailGroupVariants } from "components/ds/thumbnail-group/thumbnail-group.variants";
import { Thumbnail } from "components/ds/thumbnail/thumbnail";

export function ThumbnailGroup({ thumbnails, className, defaultSrc = true, ...props }: TThumbnailGroup.Props) {
  return (
    <div className={cn(thumbnailGroupVariants({ ...props }), className)}>
      {thumbnails.map((thumbnail, index) => (
        <Thumbnail key={`thumbnail-${index}`} {...thumbnail} {...props} defaultSrc={defaultSrc} />
      ))}
    </div>
  );
}
