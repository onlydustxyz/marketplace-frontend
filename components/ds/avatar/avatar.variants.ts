import { tv } from "tailwind-variants";

export const avatarVariants = tv({
  base: "relative box-content flex items-center justify-center overflow-hidden border-greyscale-50/12 bg-greyscale-50/8",
  variants: {
    shape: {
      square: "",
      circle: "rounded-full",
    },
    size: {
      xs: "",
      s: "",
      m: "",
      l: "",
      xl: "",
    },
    isLoading: {
      true: "animate-pulse",
    },
    background: {
      grey: "bg-greyscale-800",
      blue: "bg-spaceBlue-800",
    },
  },
  compoundVariants: [
    {
      shape: "square",
      size: "xs",
      class: "h-4 w-4 rounded border",
    },
    {
      shape: "square",
      size: "s",
      class: "h-6 w-6 rounded-lg border-2",
    },
    {
      shape: "square",
      size: "m",
      class: "h-8 w-8 rounded-xl border-2",
    },
    {
      shape: "square",
      size: "l",
      class: "relative h-10 w-10 rounded-xl border-2",
    },
    {
      shape: "square",
      size: "xl",
      class: "h-12 w-12 rounded-xl border-4",
    },
    {
      shape: "circle",
      size: "xs",
      class: "h-4 w-4 border",
    },
    {
      shape: "circle",
      size: "s",
      class: "h-6 w-6 border-2",
    },
    {
      shape: "circle",
      size: "m",
      class: "h-8 w-8 border-2",
    },
    {
      shape: "circle",
      size: "l",
      class: "relative h-10 w-10 border-2",
    },
    {
      shape: "circle",
      size: "xl",
      class: "h-12 w-12 border-4",
    },
  ],
  defaultVariants: {
    size: "m",
    shape: "circle",
    background: "grey",
  },
});
