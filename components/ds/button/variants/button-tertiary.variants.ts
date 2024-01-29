import { tv } from "tailwind-variants";

import { buttonVariants } from "./button.variants";

export const buttonTertiaryVariants = tv({
  extend: buttonVariants,
  compoundVariants: [
    {
      disabled: false,
      class: "focus-visible:bg-white/5 hover:bg-white/5",
    },
    {
      accentColor: "purple",
      class: "text-spacePurple-500",
    },
    {
      accentColor: "purple",
      disabled: false,
      class:
        "focus-visible:text-spacePurple-400 hover:text-spacePurple-400 active:bg-spacePurple-900 active:text-spacePurple-400",
    },
    {
      accentColor: "purple",
      pressed: true,
      class: "bg-spacePurple-900 text-spacePurple-400",
    },
    {
      accentColor: "orange",
      class: "text-orange-500",
    },
    {
      accentColor: "orange",
      disabled: false,
      class: "focus-visible:text-orange-400 hover:text-orange-400 active:bg-orange-900 active:text-orange-400",
    },
    {
      accentColor: "orange",
      pressed: true,
      class: "bg-orange-900 text-orange-400",
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
