import classNames from "classnames";

export enum ImageSize {
  Xxs = "Xxs",
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
    <div
      className={classNames(
        "before:border-greyscale-50/20",
        "h-fit w-fit",
        {
          "pseudo-outline": size === ImageSize.Xs,
          "pseudo-outline-2": size === ImageSize.Sm || size === ImageSize.Md,
          "pseudo-outline-3": size === ImageSize.Lg,
          "pseudo-outline-4": size === ImageSize.Xl,
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
            "h-4 w-4": size === ImageSize.Xxs,
            "h-5 w-5": size === ImageSize.Xs,
            "h-6 w-6": size === ImageSize.Sm,
            "h-8 w-8": size === ImageSize.Md,
            "h-10 w-10": size === ImageSize.Lg,
            "h-12 w-12": size === ImageSize.Xl,
          }
        )}
        alt={alt}
        src={src}
      />
    </div>
  );
}
