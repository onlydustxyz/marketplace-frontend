import { VariantProps, tv } from "tailwind-variants";
import { buttonVariants } from "./button.variants";

export type ButtonSecondaryVariants = VariantProps<typeof buttonSecondaryVariants>;

export const buttonSecondaryVariants = tv({
  extend: buttonVariants,
  base: "border drop-shadow-bottom-sm bg-white/5 text-greyscale-50",
  compoundVariants: [
    {
      accentColor: "purple",
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
      class: "border bg-card-background-medium border-card-border-light text-greyscale-600",
    },
    {
      backgroundColor: "blue",
      disabled: true,
      class: "border bg-card-background-base text-greyscale-50 border-greyscale-50",
    },
  ],
});
