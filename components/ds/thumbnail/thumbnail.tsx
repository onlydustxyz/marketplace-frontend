import { TThumbnail } from "./thumbnail.types";
import { cn } from "src/utils/cn";
import { IMAGES } from "src/assets/img";
import { thumbnailVariants } from "./thumbnail.variants";
import { Icon } from "components/layout/icon/icon";

export function Thumbnail({ src, alt, className, defaultSrc = true, ...props }: TThumbnail.Props) {
  return (
    <div className={cn(thumbnailVariants({ ...props }), className)}>
      {src || defaultSrc ? (
        <img src={src || IMAGES.logo.space} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <Icon customName="gallery-line" className="text-spaceBlue-300" />
      )}
    </div>
  );
}
