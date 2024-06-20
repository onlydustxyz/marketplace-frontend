import process from "process";

import { AvatarPort } from "components/atoms/avatar/avatar.types";

export function getAvatarImageSize(size: AvatarPort["size"]): [number, number] {
  switch (size) {
    case "xxl":
      return [96, 96];
    case "xl":
      return [48, 48];
    case "l":
      return [44, 44];
    case "ml":
      return [36, 36];
    case "m":
      return [32, 32];
    case "s":
      return [24, 24];
    case "xs":
      return [16, 16];
    default:
      return [24, 24];
  }
}
export function getAvatarSrc([w, h]: [number, number], src?: string) {
  if (!process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX || !src) {
    return src;
  }

  if (src?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX)) {
    return src;
  }

  return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}width=${w * 2},height=${h * 2},fit=cover/${src}`;
}
