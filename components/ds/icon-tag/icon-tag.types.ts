import { ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { iconTagVariants } from "components/ds/icon-tag/icon-tag.variants";
import { TSkeleton } from "components/ds/skeleton/skeleton.types";
import { TIcon } from "components/layout/icon/icon.types";

export namespace TIconTag {
  export type Variants = VariantProps<typeof iconTagVariants>;

  export interface Props extends PropsWithChildren, Variants {
    as?: ElementType;
    id?: string;
    testId?: string;
    tooltipContent?: ReactNode;
    className?: string;
    onClick?: () => void;
    icon: TIcon.Props;
  }

  export interface LoadingProps extends Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
  }
}
