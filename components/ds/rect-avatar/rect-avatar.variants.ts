import { tv } from "tailwind-variants";

export const rectAvatarVariants = tv({
  base: "relative box-content flex flex-shrink-0 items-center justify-center overflow-hidden border-greyscale-50/12 bg-greyscale-50/8",
  variants: {
    shape: {
      rectangle: "",
    },
    size: {
      s: "",
      m: "",
      l: "",
    },
    isLoading: {
      true: "animate-pulse",
    },
  },
  compoundVariants: [
    {
      shape: "rectangle",
      size: "s",
      class: "h-7 w-24 rounded border-1",
    },
    {
      shape: "rectangle",
      size: "m",
      class: "h-10 w-36 rounded-lg border-1",
    },
    {
      shape: "rectangle",
      size: "l",
      class: "h-14 w-48 rounded-xl border-1",
    },
  ],
  defaultVariants: {
    size: "m",
    shape: "rectangle",
  },
});
