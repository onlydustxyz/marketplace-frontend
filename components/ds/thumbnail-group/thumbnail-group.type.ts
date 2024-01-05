import { ThumbnailVariant } from "../thumbnail/thumbnail.variant.ts";
import { SkeletonBaseProps } from "@/components/ds/Skeleton/Skeleton.type.ts";

export interface ThumbnailGroupProps extends ThumbnailVariant {
  className?: string;
  defaultSrc?: boolean;
  thumbnails: {
    src?: string;
    alt: string;
    className?: string;
  }[];
}

export interface ThumbnailGroupLoadingProps extends ThumbnailVariant {
  className?: string;
  skeletonProps?: Partial<SkeletonBaseProps>;
}
