import classNames from "classnames";

export enum ImageSize {
  Xxs = "xxs",
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
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
  size = ImageSize.Lg,
  rounding = Rounding.Corners,
}: RoundedImageProps) {
  return (
    <img
      className={classNames(
        "outline outline-greyscale-50/20 outline-offset-0 object-cover",
        {
          "outline-1 h-4 w-4": size === ImageSize.Xxs,
          "outline-1 h-6 w-6": size === ImageSize.Xs,
          "outline-2 h-6 w-6": size === ImageSize.Sm,
          "outline-2 h-8 w-8": size === ImageSize.Md,
          "outline-3 h-10 w-10": size === ImageSize.Lg,
          "outline-4 h-12 w-12": size === ImageSize.Xl,
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
