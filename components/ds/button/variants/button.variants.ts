import { VariantProps, tv } from "tailwind-variants";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = tv({
  base: "flex flex-row items-center justify-center font-walsheim font-medium outline-none drop-shadow-bottom-sm",
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-lg text-xs px-2 py-1",
      sm: "h-8 gap-2 rounded-large text-sm px-4 py-2",
      md: "h-12 gap-2 rounded-xl text-base px-4 py-3.5",
      "md-rounded": "h-11 gap-2 rounded-full px-4 py-3",
      "lg-low-height": "h-12 gap-3 rounded-xl px-4 py-3.5",
      lg: "h-14 gap-3 rounded-xl px-6 py-4",
      "lg-rounded": "h-11 gap-3 rounded-full px-6 py-3",
    },
    width: {
      fit: "w-fit",
      full: "w-full",
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
      size: "sm",
      class: "h-8 w-8 p-2",
    },
    {
      iconOnly: true,
      size: ["md", "lg-low-height"],
      class: "h-12 w-12 p-3.5",
    },
    {
      iconOnly: true,
      size: "lg",
      class: "h-14 w-14 p-4",
    },
  ],
  defaultVariants: {
    size: "md",
    width: "fit",
    type: "primary",
    accentColor: "purple",
    backgroundColor: "default",
  },
});
