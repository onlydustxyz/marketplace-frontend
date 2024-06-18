import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { PaperCoreVariants } from "./paper.variants";

type Variants = VariantProps<typeof PaperCoreVariants>;
type classNames = Partial<typeof PaperCoreVariants["slots"]>;

export interface TPaperProps<C extends ElementType> extends Variants, PropsWithChildren {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: classNames;
  as?: C;
}
