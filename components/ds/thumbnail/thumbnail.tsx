import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";

import { TThumbnail } from "./thumbnail.types";
import { thumbnailVariants } from "./thumbnail.variants";

export function Thumbnail({ src, alt, className, defaultSrc = true, ...props }: TThumbnail.Props) {
  return (
    <div className={cn(thumbnailVariants({ ...props }), className)}>
      {src || defaultSrc ? (
        <img src={src || IMAGES.logo.space} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <Icon customName="galleryLine" className="text-spaceBlue-300" />
      )}
    </div>
  );
}
