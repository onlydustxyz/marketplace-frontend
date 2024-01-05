import { ElementType, PropsWithChildren } from "react";
import { TagVariants } from "@/components/ds/tag/tag.variants.ts";
import { SkeletonBaseProps } from "@/components/ds/Skeleton/Skeleton.type.ts";

export interface TagProps extends PropsWithChildren, TagVariants {
  as?: ElementType;
  id?: string;
  testId?: string;
  className?: string;
  onClick?: () => void;
}

export interface TagLoadingProps extends TagVariants {
  className?: string;
  skeletonProps?: Partial<SkeletonBaseProps>;
}
