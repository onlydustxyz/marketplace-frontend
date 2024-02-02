import { ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { cardVariants } from "./card.variants";

export namespace TCard {
  export type Variants = VariantProps<typeof cardVariants>;

  export interface Props extends PropsWithChildren, Variants {
    as?: ElementType;
    href?: string;
    className?: string;
    dataTestId?: string;
    onClick?: () => void;
  }
}
