import { tv } from "tailwind-variants";

import { buttonVariants } from "./button.variants";

export const buttonPrimaryVariants = tv({
  extend: buttonVariants,
  base: "bg-greyscale-50 text-spaceBlue-900 shadow-bottom-sm",
  compoundVariants: [
    {
      disabled: false,
      class: "active:shadow-none active:outline active:outline-4",
    },
    {
      pressed: true,
      class: "shadow-none outline outline-4",
    },
    {
      accentColor: "purple",
      disabled: false,
      class:
        "focus-visible:bg-spacePurple-50 focus-visible:text-spacePurple-900 hover:bg-spacePurple-50 hover:text-spacePurple-900 active:bg-spacePurple-50 active:text-spacePurple-900 active:outline-spacePurple-800",
    },
    {
      accentColor: "purple",
      pressed: true,
      class: "bg-spacePurple-50 text-spacePurple-900 outline-spacePurple-800",
    },
    {
      accentColor: "orange",
      disabled: false,
      class:
        "focus-visible:bg-orange-50 focus-visible:text-orange-900 hover:bg-orange-50 hover:text-orange-900 active:bg-orange-50 active:text-orange-900 active:outline-orange-800",
    },
    {
      accentColor: "orange",
      pressed: true,
      class: "bg-orange-50 text-orange-900 outline-orange-800",
    },
    {
      backgroundColor: "default",
      disabled: true,
      class: "bg-greyscale-700 text-greyscale-200 shadow-none",
    },
    {
      backgroundColor: "blue",
      disabled: true,
      class: "bg-spaceBlue-600 text-spaceBlue-200 shadow-none",
    },
  ],
});
