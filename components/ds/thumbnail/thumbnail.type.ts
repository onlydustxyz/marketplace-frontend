import { ThumbnailVariant } from "./thumbnail.variant.ts";

export interface ThumbnailProps extends ThumbnailVariant {
  src?: string;
  alt: string;
  className?: string;
  defaultSrc?: boolean;
}
