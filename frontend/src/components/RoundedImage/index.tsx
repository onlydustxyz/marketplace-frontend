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
    <img
      className={classNames(
        "outline outline-greyscale-50/20 outline-offset-0 object-cover",
        {
          "outline-1 h-6 w-6": size === ImageSize.ExtraSmall,
          "outline-2 h-6 w-6": size === ImageSize.Small,
          "outline-2 h-8 w-8": size === ImageSize.Medium,
          "outline-3 h-10 w-10": size === ImageSize.Large,
          "outline-4 h-12 w-12": size === ImageSize.ExtraLarge,
          "rounded-xl": rounding === Rounding.Corners,
          "rounded-full": rounding === Rounding.Circle,
        },
        className
      )}
      alt={alt}
      src={src}
    />
  );
}
