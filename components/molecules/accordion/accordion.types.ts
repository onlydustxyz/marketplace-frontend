import { ComponentPropsWithoutRef, ElementType } from "react";
import { VariantProps } from "tailwind-variants";

import { AccordionCoreVariants } from "./accordion.variants";

type Variants = VariantProps<typeof AccordionCoreVariants>;
type classNames = Partial<typeof AccordionCoreVariants["slots"]>;

export interface AccordionPort<C extends ElementType> extends Variants {
  classNames?: classNames;
  htmlPort?: ComponentPropsWithoutRef<C>;
  as?: C;
}
