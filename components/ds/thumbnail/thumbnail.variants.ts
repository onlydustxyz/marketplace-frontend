import { tv } from "tailwind-variants";

export const thumbnailVariants = tv({
  base: "relative box-content flex items-center justify-center overflow-hidden border-greyscale-50/12 bg-greyscale-50/8",
  variants: {
    type: {
      project: "",
      user: "rounded-full",
    },
    size: {
      xs: "",
      s: "",
      m: "",
      l: "",
      xl: "",
    },
  },
  compoundVariants: [
    {
      type: "project",
      size: "xs",
      class: "h-4 w-4 rounded border",
    },
    {
      type: "project",
      size: "s",
      class: "h-6 w-6 rounded-lg border-2",
    },
    {
      type: "project",
      size: "m",
      class: "h-8 w-8 rounded-xl border-2",
    },
    {
      type: "project",
      size: "l",
      class: "relative h-10 w-10 rounded-xl border-2",
    },
    {
      type: "project",
      size: "xl",
      class: "h-12 w-12 rounded-xl border-4",
    },
    {
      type: "user",
      size: "xs",
      class: "h-4 w-4 border",
    },
    {
      type: "user",
      size: "s",
      class: "h-6 w-6 border-2",
    },
    {
      type: "user",
      size: "m",
      class: "h-8 w-8 border-2",
    },
    {
      type: "user",
      size: "l",
      class: "relative h-10 w-10 border-2",
    },
    {
      type: "user",
      size: "xl",
      class: "h-12 w-12 border-4",
    },
  ],
  defaultVariants: {
    size: "m",
    type: "user",
  },
});
