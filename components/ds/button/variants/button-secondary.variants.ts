import { tv } from "tailwind-variants";

import { buttonVariants } from "./button.variants";

export const buttonSecondaryVariants = tv({
  extend: buttonVariants,
  base: "border bg-white/5 text-greyscale-50 drop-shadow-bottom-sm",
  compoundVariants: [
    {
      accentColor: "purple",
      disabled: false,
      class:
        "focus-visible:border-spacePurple-200 focus-visible:text-spacePurple-100 hover:border-spacePurple-200 hover:text-spacePurple-100 active:border-spacePurple-400 active:bg-spacePurple-900 active:text-spacePurple-200",
    },
    {
      accentColor: "purple",
      pressed: true,
      class: "border-spacePurple-400 bg-spacePurple-900 text-spacePurple-200",
    },
    {
      accentColor: "orange",
      disabled: false,
      class:
        "focus-visible:border-orange-200 focus-visible:text-orange-100 hover:border-orange-200 hover:text-orange-100 active:border-orange-400 active:bg-orange-900 active:text-orange-200",
    },
    {
      accentColor: "orange",
      pressed: true,
      class: "border-orange-400 bg-orange-900 text-orange-200",
    },
    {
      backgroundColor: "default",
      disabled: true,
      class: "border border-card-border-light bg-card-background-medium text-greyscale-600",
    },
    {
      backgroundColor: "blue",
      disabled: true,
      class: "border border-greyscale-50 bg-card-background-base text-greyscale-50",
    },
  ],
});
