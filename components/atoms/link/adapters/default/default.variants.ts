import { tv } from "tailwind-variants";

import { LinkCoreVariants } from "../../link.variants";

export const LinkDefaultVariants = tv({
  extend: LinkCoreVariants,
  slots: {
    base: "",
  },
  variants: {},
  defaultVariants: {},
});
