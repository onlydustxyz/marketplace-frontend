import { ElementType, PropsWithChildren, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { TSkeleton } from "components/ds/skeleton/skeleton.types";
import { iconTagVariants } from "components/ds/icon-tag/icon-tag.variants";
import { TCustomIcon } from "components/layout/icon/custom-icon.types";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export namespace TIconTag {
  export type Variants = VariantProps<typeof iconTagVariants>;

  interface BaseProps extends PropsWithChildren, Variants {
    as?: ElementType;
    id?: string;
    testId?: string;
    tooltipContent?: ReactNode;
    className?: string;
    onClick?: () => void;
  }

  interface CustomProps extends BaseProps {
    customName: TCustomIcon.Names;
    remixName?: never;
  }

  interface RemixProps extends BaseProps {
    remixName: RemixIconsName;
    customName?: never;
  }

  export type Props = CustomProps | RemixProps;

  export interface LoadingProps extends Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
  }
}
