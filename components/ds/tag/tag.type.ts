import { ElementType, PropsWithChildren } from "react";
import { TagVariants } from "@/components/ds/tag/tag.variants.ts";

export interface TagProps extends PropsWithChildren, TagVariants {
  as?: ElementType;
  id?: string;
  testId?: string;
  className?: string;
  onClick?: () => void;
}
