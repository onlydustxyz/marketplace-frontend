import { tv } from "tailwind-variants";

import { cn } from "src/utils/cn";

export const iconTagVariants = tv({
  base: cn(
    "h-7 w-7 border p-2 transition-all",
    "relative flex items-center justify-center overflow-hidden rounded-full border-greyscale-50/12 bg-greyscale-50/8 duration-300 ease-in"
  ),
  variants: {
    active: {
      true: "border-2 border-spacePurple-500 bg-spacePurple-900",
      false: "border-greyscale-50/12",
    },
    size: {
      s: "h-6 w-6",
      m: "h-7 w-7",
    },
  },
  defaultVariants: {
    active: false,
    size: "m",
  },
});
