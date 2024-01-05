import { ThumbnailVariant } from "./thumbnail.variant.ts";
import { SkeletonBaseProps } from "@/components/ds/Skeleton/Skeleton.type.ts";

export interface ThumbnailProps extends ThumbnailVariant {
  src?: string;
  alt: string;
  className?: string;
  defaultSrc?: boolean;
}
export interface ThumbnailLoadingProps extends ThumbnailVariant {
  className?: string;
  skeletonProps?: Partial<SkeletonBaseProps>;
  animate?: boolean;
}
