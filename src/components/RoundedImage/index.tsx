import process from "process";
import { useMemo } from "react";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { withClientOnly } from "components/layout/client-only/client-only";

export enum ImageSize {
  Xxs = "Xxs",
  Xs = ImageSize.Xxs,
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
  src?: string | null;
  alt: string | null;
  size?: ImageSize;
  className?: string;
  rounding?: Rounding;
  useLogoFallback?: boolean;
}

function RoundedImage({
  src,
  alt,
  className,
  size = ImageSize.Lg,
  rounding = Rounding.Corners,
  useLogoFallback,
}: RoundedImageProps) {
  const srcMemo = useMemo(() => {
    if (src?.length) {
      return src;
    }
    if (useLogoFallback) {
      return IMAGES.logo.space;
    }

    return src;
  }, [src, useLogoFallback]);

  const isRemoteImage = useMemo(() => {
    if (!src?.length && useLogoFallback) {
      return false;
    }

    if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX) {
      return !src?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
    }

    return false;
  }, [src]);

  const sizeFromVariant = useMemo(() => {
    switch (size) {
      case ImageSize.Xxs:
        return { w: 16, h: 16 };
      case ImageSize.Xs:
        return { w: 20, h: 20 };
      case ImageSize.Sm:
        return { w: 24, h: 24 };
      case ImageSize.Md:
        return { w: 32, h: 32 };
      case ImageSize.Lg:
        return { w: 40, h: 40 };
      case ImageSize.Xl:
        return { w: 48, h: 48 };
      default:
        return undefined;
    }
  }, [size]);

  const optimizeSrc = useMemo(() => {
    if (isRemoteImage && sizeFromVariant) {
      const size = sizeFromVariant;
      const dpr = window.devicePixelRatio;
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}width=${size.w * dpr},height=${
        size.h * dpr
      },fit=cover/${src}`;
    }

    return srcMemo;
  }, [isRemoteImage, sizeFromVariant, srcMemo, src]);

  return (
    <div
      className={cn(
        "h-fit w-fit min-w-max shrink-0 before:border-greyscale-50/20",
        {
          "pseudo-outline": size === ImageSize.Xxs,
          "pseudo-outline-2": size === ImageSize.Sm || size === ImageSize.Md,
          "pseudo-outline-3": size === ImageSize.Lg,
          "pseudo-outline-4": size === ImageSize.Xl,
          "rounded-md": rounding === Rounding.Corners && size === ImageSize.Xxs,
          "rounded-lg": rounding === Rounding.Corners && (size === ImageSize.Xs || size === ImageSize.Sm),
          "rounded-xl":
            rounding === Rounding.Corners && (size === ImageSize.Md || size === ImageSize.Lg || size === ImageSize.Xl),
          "rounded-full": rounding === Rounding.Circle,
        },
        className
      )}
    >
      <img
        className={cn("object-cover", {
          "rounded-xl": rounding === Rounding.Corners,
          "rounded-full": rounding === Rounding.Circle,
          "h-4 w-4": size === ImageSize.Xxs,
          "h-5 w-5": size === ImageSize.Xs,
          "h-6 w-6": size === ImageSize.Sm,
          "h-8 w-8": size === ImageSize.Md,
          "h-10 w-10": size === ImageSize.Lg,
          "h-12 w-12": size === ImageSize.Xl,
        })}
        alt={alt ?? ""}
        src={optimizeSrc ?? ""}
        onError={e => {
          if (useLogoFallback) {
            e.currentTarget.src = IMAGES.logo.space;
          }
        }}
        loading="lazy"
      />
    </div>
  );
}

export default withClientOnly(RoundedImage);
