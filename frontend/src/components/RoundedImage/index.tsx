export enum ImageSize {
  ExtraSmall = "xs",
  Small = "sm",
  Medium = "md",
  Large = "lg",
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
  size = ImageSize.Medium,
  rounding = Rounding.Corners,
}: RoundedImageProps) {
  return (
    <img
      className={`outline outline-greyscale-50/20 outline-offset-0 object-cover ${
        size === ImageSize.ExtraSmall && "outline-1 h-6 w-6"
      } ${size === ImageSize.Small && "outline-2 h-8 w-8"} ${size === ImageSize.Medium && "outline-3 h-10 w-10"} ${
        size === ImageSize.Large && "outline-4 h-12 w-12"
      } ${rounding === Rounding.Corners ? "rounded-xl" : "rounded-full"} ${className}`}
      alt={alt}
      src={src}
    />
  );
}
