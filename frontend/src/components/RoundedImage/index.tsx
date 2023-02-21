import classNames from "classnames";

export enum ImageSize {
  ExtraSmall = "xs",
  Small = "sm",
  Medium = "md",
  Large = "lg",
  ExtraLarge = "xl",
}

export enum Rounding {
  Corners = "corners",
  Circle = "circle",
}

interface RoundedImageProps {
  src: string;
  alt: string;
  size?: ImageSize;
  className?: string;
  rounding?: Rounding;
}

export default function RoundedImage({
  src,
  alt,
  className,
  size = ImageSize.Large,
  rounding = Rounding.Corners,
}: RoundedImageProps) {
  return (
    <div
      className={classNames(
        "before:border-greyscale-50/20",
        "h-fit w-fit",
        {
          "pseudo-outline": size === ImageSize.ExtraSmall,
          "pseudo-outline-2": size === ImageSize.Small || size === ImageSize.Medium,
          "pseudo-outline-3": size === ImageSize.Large,
          "pseudo-outline-4": size === ImageSize.ExtraLarge,
        },
        {
          "rounded-xl": rounding === Rounding.Corners,
          "rounded-full": rounding === Rounding.Circle,
        },
        className
      )}
    >
      <img
        className={classNames(
          "object-cover",
          {
            "rounded-xl": rounding === Rounding.Corners,
            "rounded-full": rounding === Rounding.Circle,
          },
          {
            "h-5 w-5": size === ImageSize.ExtraSmall,
            "h-6 w-6": size === ImageSize.Small,
            "h-8 w-8": size === ImageSize.Medium,
            "h-10 w-10": size === ImageSize.Large,
            "h-12 w-12": size === ImageSize.ExtraLarge,
          }
        )}
        alt={alt}
        src={src}
      />
    </div>
  );
}
