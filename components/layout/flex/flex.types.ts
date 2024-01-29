import { ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { flexVariants } from "./flex.variants";

export namespace TFlex {
  export type Variants = VariantProps<typeof flexVariants>;

  export interface Props extends PropsWithChildren, Variants {
    className?: string;
    as?: ElementType;
    onClick?: () => void;
  }
}
