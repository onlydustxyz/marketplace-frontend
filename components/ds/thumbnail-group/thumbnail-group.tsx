import { ThumbnailProps } from "./thumbnail.type.ts";
import { cn } from "../../../src/utils/cn.ts";
import { IMAGES } from "../../../src/assets/img";
import GalleryLine from "../../../src/assets/icons/GalleryLine.tsx";
import { thumbnailVariant } from "@/components/ds/thumbnail/thumbnail.variant.ts";
export function ThumbnailGroup({ src, alt, className, defaultSrc = true, ...props }: ThumbnailProps) {
  return (
    <div className={cn(thumbnailVariant({ ...props }), className)}>
      {src || defaultSrc ? (
        <img src={src || IMAGES.logo.space} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <GalleryLine className="h-4 w-4 text-spaceBlue-300" />
      )}
    </div>
  );
}

export default ThumbnailGroup;
