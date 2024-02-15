import { Avatar as NextAvatar } from "@nextui-org/react";
import Image from "next/image";
import * as process from "process";
import { useMemo, useState } from "react";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { TAvatar } from "components/ds/avatar/avatar.types";
import { avatarVariants } from "components/ds/avatar/avatar.variants";

export function Avatar(props: TAvatar.Props) {
  const [isError, setIsError] = useState(false);
  // size prop needs to be extracted or it conflicts with the size prop from NextAvatar
  const { size, className, ...restProps } = props;

  const isRemoteImage = useMemo(() => {
    if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX && props.src) {
      return !props.src?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
    }

    return false;
  }, [props]);

  const sizeFromVariant = useMemo(() => {
    const size = props.size;
    const dpr = window.devicePixelRatio;
    switch (size) {
      case "xs":
        return { w: 16 * dpr, h: 16 * dpr };
      case "s":
        return { w: 24 * dpr, h: 24 * dpr };
      case "m":
        return { w: 32 * dpr, h: 32 * dpr };
      case "l":
        return { w: 40 * dpr, h: 40 * dpr };
      case "xl":
        return { w: 48 * dpr, h: 48 * dpr };
      default:
        return { w: 16 * dpr, h: 16 * dpr };
    }
  }, [props]);

  const optimizeSrc = useMemo(() => {
    if (isError) {
      return IMAGES.logo.space;
    }
    if (isRemoteImage && sizeFromVariant) {
      const size = sizeFromVariant;
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}width=${size.w},height=${size.h},fit=cover/${props.src}`;
    }

    return props.src;
  }, [isRemoteImage, sizeFromVariant, isError]);

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
      className={cn(avatarVariants({ size, ...restProps }), className)}
      imgProps={{
        loading: "lazy",
        onError: () => {
          setIsError(true);
        },
      }}
      classNames={{
        fallback: "w-full",
        img: "bg-greyscale-900",
      }}
      {...restProps}
      src={optimizeSrc}
    />
  );
}
