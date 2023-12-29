import { tv, VariantProps } from "tailwind-variants";
import { cn } from "src/utils/cn";
import { IMAGES } from "../../../src/assets/img";
import { ElementType, PropsWithChildren } from "react";

export type RoundedImageVariants = VariantProps<typeof imageVariant>;

interface RoundedImageProps extends PropsWithChildren, RoundedImageVariants {
  as?: ElementType;
  src: string | null;
  alt: string | null;
  className?: string;
  useLogoFallback?: boolean;
}

const imageVariant = tv({
  base: "object-cover",
  variants: {
    size: {
      xxs: "h-4 w-4",
      xs: "h-5 w-5",
      xm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
      xl: "h-12 w-12",
    },
    rounding: {
      corners: "rounded-md", // Adjust these classes as needed
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    size: "lg",
    rounding: "corners",
  },
});

export default function RoundedImage({
  as: Component = "span",
  src,
  alt,
  useLogoFallback,
  className,
  ...props
}: RoundedImageProps) {
  const fallbackSrc = useLogoFallback ? IMAGES.logo.space : src;

  return (
    <Component className={className}>
      <img
        className={cn(imageVariant({ ...props }), className)}
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
