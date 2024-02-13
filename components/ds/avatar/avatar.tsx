import { Avatar as NextAvatar } from "@nextui-org/react";
import * as process from "process";
import { useMemo } from "react";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { TAvatar } from "components/ds/avatar/avatar.types";
import { avatarVariants } from "components/ds/avatar/avatar.variants";

export function Avatar(props: TAvatar.Props) {
  // size prop needs to be extracted or it conflicts with the size prop from NextAvatar
  const { size, className, ...restProps } = props;

  const isRemoteImage = useMemo(() => {
    if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX) {
      return !props.src?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
    }

    return false;
  }, [props]);

  const sizeFromVariant = useMemo(() => {
    const size = props.size;
    switch (size) {
      case "xs":
        return { w: 16, h: 16 };
      case "s":
        return { w: 24, h: 24 };
      case "m":
        return { w: 32, h: 32 };
      case "l":
        return { w: 40, h: 40 };
      case "xl":
        return { w: 48, h: 48 };
      default:
        return undefined;
    }
  }, [props]);

  const optimizeSrc = useMemo(() => {
    if (isRemoteImage && sizeFromVariant) {
      const size = sizeFromVariant;
      const dpr = window.devicePixelRatio;
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}width=${size.w * dpr},height=${
        size.w * dpr
      },fit=cover/${props.src}`;
    }

    return props.src;
  }, [isRemoteImage, sizeFromVariant]);

  return (
    <NextAvatar
      fallback={<img src={IMAGES.logo.space} alt="OnlyDust" loading="lazy" />}
      className={cn(avatarVariants({ size, ...restProps }), className)}
      imgProps={{ loading: "lazy" }}
      classNames={{
        fallback: "w-full",
        img: "bg-greyscale-900",
      }}
      {...restProps}
      src={optimizeSrc}
    />
  );
}
