import process from "process";

import { IMAGES } from "src/assets/img";

export function optimiseImageSource(src?: string, options?: { size?: { w: number; h: number } }) {
  if (!src) {
    return IMAGES.logo.space;
  }

  const isRemoteImage = (() => {
    if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX && src) {
      return !src?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
    }

    return false;
  })();

  const optimizeSrc = () => {
    if (isRemoteImage) {
      const size = options?.size || { w: 24, h: 24 };
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}width=${size.w},height=${size.h},fit=cover/${src}`;
    }

    return src;
  };

  return optimizeSrc();
}
