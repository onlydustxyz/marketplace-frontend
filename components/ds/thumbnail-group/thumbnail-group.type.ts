import { ThumbnailVariant } from "../thumbnail/thumbnail.variant.ts";

export interface ThumbnailGroupProps extends ThumbnailVariant {
  className?: string;
  defaultSrc?: boolean;
  thumbnails: {
    src?: string;
    alt: string;
    className?: string;
  }[];
}
