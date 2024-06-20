import { AccordionCoreVariants } from "../../accordion.variants";
import { tv } from "tailwind-variants";

export const AccordionDefaultVariants = tv({
  extend: AccordionCoreVariants,
  slots: {
    base: "",
  },
  variants: {},
  defaultVariants: {},
});
