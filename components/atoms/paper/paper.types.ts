import { ElementType } from "react";
import { VariantProps } from "tailwind-variants";
import { AsProps } from "types/as-element";

import { PaperCoreVariants } from "./paper.variants";

type Variants = VariantProps<typeof PaperCoreVariants>;
type classNames = Partial<typeof PaperCoreVariants["slots"]>;

export type TPaperProps<C extends ElementType> = AsProps<C> &
  Variants & {
    classNames?: classNames;
    as?: C;
  };
