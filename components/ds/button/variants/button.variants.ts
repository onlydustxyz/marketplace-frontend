import { VariantProps, tv } from "tailwind-variants";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = tv({
  base: "flex flex-row items-center justify-center font-walsheim font-medium outline-none drop-shadow-bottom-sm",
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-lg text-xs px-2 py-1",
      s: "h-8 gap-2 rounded-large text-sm px-4 py-2",
      m: "h-12 gap-2 rounded-xl text-base px-4 py-3.5",
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
    type: {
      primary: "",
      secondary: "",
      tertiary: "",
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
    type: "primary",
    accentColor: "purple",
    backgroundColor: "default",
  },
});
