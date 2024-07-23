import process from "process";

import { ImageFacadePort } from "./image-facade-port";

function isRemote(image: string) {
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX && image) {
    return !image.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
  }

  return false;
}

function optimizeSrc(
  src: string,
  options?: Partial<{
    format: string;
    width: number;
    height: number;
    fit: string;
  }>
) {
  if (isRemote(src)) {
    const params = options
      ? Object.entries(options)
          .map(([key, value]) => `${key}=${value}`)
          .join(",")
      : "";

    return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}${params}/${src}`;
  }

  return src;
}

export const ImageAdapter: ImageFacadePort = {
  isRemote,
  optimizeSrc,
};
