import { LinkCoreVariants } from "../../link.variants";
import { tv } from "tailwind-variants";

export const LinkDefaultVariants = tv({
  extend: LinkCoreVariants,
  slots: {
    base: "",
  },
  variants: {},
  defaultVariants: {},
});
