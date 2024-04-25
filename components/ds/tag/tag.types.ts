import { ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { tagVariants } from "components/ds/tag/tag.variants";

import { TSkeleton } from "../skeleton/skeleton.types";

export namespace TTag {
  export type Variants = VariantProps<typeof tagVariants>;

  export interface Props extends PropsWithChildren, Variants {
    as?: ElementType;
    id?: string;
    testId?: string;
    tooltipContent?: ReactNode;
    className?: string;
    onClick?: (e: Event) => void;
    containerClassName?: string;
  }

  export interface LoadingProps extends Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
  }
}
