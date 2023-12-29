import { VariantProps, tv } from "tailwind-variants";
import { buttonVariants } from "./button.variants";

export type ButtonTertiaryVariants = VariantProps<typeof buttonTertiaryVariants>;

export const buttonTertiaryVariants = tv({
  extend: buttonVariants,
  base: "focus-visible:bg-white/5 hover:bg-white/5",
  compoundVariants: [
    {
      accentColor: "purple",
      class:
        "text-spacePurple-500 focus-visible:text-spacePurple-400 hover:text-spacePurple-400 active:text-spacePurple-400 active:bg-spacePurple-900",
    },
    {
      accentColor: "purple",
      pressed: true,
      class: "text-spacePurple-400 bg-spacePurple-900",
    },
    {
      accentColor: "orange",
      class:
        "text-orange-500 focus-visible:text-orange-400 hover:text-orange-400 active:text-orange-400 active:bg-orange-900",
    },
    {
      accentColor: "orange",
      pressed: true,
      class: "text-orange-400 bg-orange-900",
    },
    {
      backgroundColor: "default",
      disabled: true,
      class: "text-greyscale-600",
    },
    {
      backgroundColor: "blue",
      disabled: true,
      class: "text-greyscale-600",
    },
  ],
});
