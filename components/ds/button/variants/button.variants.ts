import { tv } from "tailwind-variants";

import { cn } from "src/utils/cn";

export const buttonVariants = tv({
  base: cn(
    // should be here because of prettier re-ordering
    "transition-all",
    "flex flex-row items-center justify-center font-walsheim font-medium outline-none drop-shadow-bottom-sm duration-300 ease-in"
  ),
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-lg px-2 py-1 text-xs",
      s: "h-8 gap-2 rounded-large px-4 py-2 text-sm",
      m: "h-12 gap-2 rounded-xl px-4 py-3.5 text-base",
      l: "h-14 gap-3 rounded-xl px-6 py-4",
    },
    width: {
      fit: "w-fit",
      full: "w-full",
    },
    rounded: {
      lg: "rounded-lg",
      large: "rounded-large",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    variant: {
      primary: "",
      secondary: "",
      tertiary: "",
      "multi-color": "",
    },
    accentColor: {
      purple: "",
      orange: "",
    },
    backgroundColor: {
      default: "",
      blue: "",
    },
    pressed: {
      true: "",
    },
    disabled: {
      true: "cursor-not-allowed",
    },
    iconOnly: {
      true: "",
    },
  },
  compoundVariants: [
    {
      iconOnly: true,
      size: "xs",
      class: "h-6 w-6 p-1",
    },
    {
      iconOnly: true,
      size: "s",
      class: "h-8 w-8 p-2",
    },
    {
      iconOnly: true,
      size: "m",
      class: "h-12 w-12 p-3.5",
    },
    {
      iconOnly: true,
      size: "l",
      class: "h-14 w-14 p-4",
    },
  ],
  defaultVariants: {
    size: "m",
    width: "fit",
    variant: "primary",
    accentColor: "purple",
    backgroundColor: "default",
    disabled: false,
  },
});
