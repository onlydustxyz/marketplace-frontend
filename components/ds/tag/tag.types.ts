import { ElementType, PropsWithChildren } from "react";
import { tagVariants } from "@/components/ds/tag/tag.variants.ts";

import { VariantProps } from "tailwind-variants";
import { TSkeleton } from "../skeleton/skeleton.types";

export namespace TTag {
  export type Variants = VariantProps<typeof tagVariants>;

  export interface Props extends PropsWithChildren, Variants {
    as?: ElementType;
    id?: string;
    testId?: string;
    className?: string;
    onClick?: () => void;
  }

  export interface LoadingProps extends Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
  }
}
