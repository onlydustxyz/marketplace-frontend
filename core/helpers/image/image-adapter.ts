import process from "process";

import { ImageFacadePort, OptimizeImageOptions } from "./image-facade-port";

export class ImageAdapter implements ImageFacadePort {
  isRemote(image: string) {
    if (process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX && image) {
      return !image.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX);
    }

    return false;
  }

  optimizeSrc(src: string, options?: Partial<OptimizeImageOptions>) {
    if (this.isRemote(src)) {
      const params = options
        ? Object.entries(options)
            .map(([key, value]) => `${key}=${value}`)
            .join(",")
        : "";

      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}${params}/${src}`;
    }

    return src;
  }
}
