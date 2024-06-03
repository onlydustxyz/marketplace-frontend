import { tv } from "tailwind-variants";

import { cn } from "src/utils/cn";

import { buttonVariants } from "./button.variants";

export const buttonMultiColorVariants = tv({
  extend: buttonVariants,
  base: cn(
    "relative overflow-hidden",
    "before:absolute before:-z-[2] before:w-[calc(100%_*_2)] before:animate-spin-invert-slow before:bg-multi-color-gradient before:aspect-square",
    "rounded-lg after:absolute after:inset-px after:-z-[1] after:bg-card-background-base after:transition-all"
  ),
  variants: {
    rounded: {
      lg: "before:rounded-lg after:rounded-lg",
      large: "before:rounded-large after:rounded-large",
      xl: "before:rounded-xl after:rounded-xl",
      full: "before:rounded-full after:rounded-full",
    },
    size: {
      xs: "before:rounded-lg after:rounded-lg",
      s: "before:rounded-large after:rounded-large",
      m: "before:rounded-xl after:rounded-xl",
      l: "before:rounded-full after:rounded-full",
    },
  },
  compoundVariants: [
    {
      disabled: false,
      class: "after:duration-300 after:ease-in hover:after:scale-x-[0.98] hover:after:scale-y-[0.90]",
    },
  ],
});
