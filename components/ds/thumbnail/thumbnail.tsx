import { TThumbnail } from "./thumbnail.types.ts";
import { cn } from "src/utils/cn.ts";
import { IMAGES } from "src/assets/img";
import GalleryLine from "src/assets/icons/GalleryLine.tsx";
import { thumbnailVariants } from "./thumbnail.variants.ts";

export function Thumbnail({ src, alt, className, defaultSrc = true, ...props }: TThumbnail.Props) {
  return (
    <div className={cn(thumbnailVariants({ ...props }), className)}>
      {src || defaultSrc ? (
        <img src={src || IMAGES.logo.space} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <GalleryLine className="h-4 w-4 text-spaceBlue-300" />
      )}
    </div>
  );
}
