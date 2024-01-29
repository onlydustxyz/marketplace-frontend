import { tv } from "tailwind-variants";

export const iconTagVariants = tv({
  base: "relative flex items-center justify-center overflow-hidden rounded-full border-greyscale-50/12 bg-greyscale-50/8",
  variants: {
    size: {
      small: "h-6 w-6 border p-1",
      medium: "h-8 w-8 border p-2",
      large: "h-10 w-10 border p-3",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});
