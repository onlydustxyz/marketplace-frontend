import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { TRoundedImage } from "./rounded-image.types";
import { roundedImageVariants } from "./rounded-image.variants";

export function RoundedImage({
  as: Component = "span",
  src,
  alt,
  useLogoFallback,
  className,
  ...props
}: TRoundedImage.Props) {
  const fallbackSrc = useLogoFallback ? IMAGES.logo.space : src;

  return (
    <Component className={className}>
      <img
        className={cn(roundedImageVariants({ ...props }), className)}
        alt={alt ?? ""}
        src={fallbackSrc ?? ""}
        onError={e => {
          if (useLogoFallback) {
            e.currentTarget.src = IMAGES.logo.space;
          }
        }}
        loading="lazy"
      />
    </Component>
  );
}
