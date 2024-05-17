"use client";

import { Avatar as NextAvatar } from "@nextui-org/react";
import Image from "next/image";
import * as process from "process";
import { useMemo, useState } from "react";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { TRectAvatar } from "components/ds/rect-avatar/rect-avatar.types";
import { rectAvatarVariants } from "components/ds/rect-avatar/rect-avatar.variants";
import { useClientOnly } from "components/layout/client-only/client-only";

export function RectAvatar(props: TRectAvatar.Props) {
  const isClient = useClientOnly();
  const [isError, setIsError] = useState(false);
  // size prop needs to be extracted or it conflicts with the size prop from NextAvatar
  const { size, className, isBordered = true, classNames, ...restProps } = props;

  const isRemoteImage = useMemo(() => {
    if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX && props.src) {
      return !props.src?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
    }

    return false;
  }, [props, isClient]);

  const sizeFromVariant = useMemo(() => {
    const size = props.size;
    const dpr = isClient ? window.devicePixelRatio : 1;
    switch (size) {
      case "s":
        return { w: 96 * dpr, h: 28 * dpr };
      case "m":
        return { w: 144 * dpr, h: 42 * dpr };
      case "l":
        return { w: 192 * dpr, h: 56 * dpr };
      default:
        return { w: 192 * dpr, h: 56 * dpr };
    }
  }, [props, isClient]);

  const optimizeSrc = useMemo(() => {
    if (isError) {
      return IMAGES.logo.space;
    }
    if (isRemoteImage && sizeFromVariant) {
      const size = sizeFromVariant;
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}width=${size.w},height=${size.h},fit=cover/${props.src}`;
    }

    return props.src;
  }, [isRemoteImage, sizeFromVariant, isError, isClient]);

  return (
    <NextAvatar
      fallback={
        <Image
          src={IMAGES.logo.space}
          width={sizeFromVariant.w}
          height={sizeFromVariant.h}
          alt="OnlyDust"
          loading="lazy"
        />
      }
      className={cn(rectAvatarVariants({ size, ...restProps }), className, { "border-none": !isBordered })}
      imgProps={{
        loading: "lazy",
        onError: () => {
          setIsError(true);
        },
      }}
      classNames={{
        ...classNames,
        fallback: cn("w-full", classNames?.img),
        img: cn("bg-greyscale-900 !opacity-100", classNames?.img),
      }}
      {...restProps}
      src={optimizeSrc}
    />
  );
}
