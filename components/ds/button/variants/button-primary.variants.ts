import { VariantProps, tv } from "tailwind-variants";
import { buttonVariants } from "./button.variants";

export type ButtonPrimaryVariants = VariantProps<typeof buttonPrimaryVariants>;

export const buttonPrimaryVariants = tv({
  extend: buttonVariants,
  base: "active:shadow-none active:outline active:outline-4 bg-greyscale-50 text-spaceBlue-900 shadow-bottom-sm",
  compoundVariants: [
    {
      pressed: true,
      class: "shadow-none outline outline-4",
    },
    {
      accentColor: "purple",
      class:
        "active:bg-spacePurple-50 active:text-spacePurple-900 active:outline-spacePurple-800 focus-visible:bg-spacePurple-50 focus-visible:text-spacePurple-900 hover:bg-spacePurple-50 hover:text-spacePurple-900",
    },
    {
      accentColor: "purple",
      pressed: true,
      class: "bg-spacePurple-50 text-spacePurple-900 outline-spacePurple-800",
    },
    {
      accentColor: "orange",
      class:
        "active:bg-orange-50 active:text-orange-900 active:outline-orange-800 focus-visible:bg-orange-50 focus-visible:text-orange-900 hover:bg-orange-50 hover:text-orange-900",
    },
    {
      accentColor: "orange",
      pressed: true,
      class: "bg-orange-50 text-orange-900 outline-orange-800",
    },
    {
      backgroundColor: "default",
      disabled: true,
      class: "shadow-none bg-greyscale-700 text-greyscale-200",
    },
    {
      backgroundColor: "blue",
      disabled: true,
      class: "shadow-none bg-spaceBlue-600 text-spaceBlue-200",
    },
  ],
});
