import { tv } from "tailwind-variants";

export const avatarGroupVariants = tv({
  base: "flex -space-x-1",
  variants: {
    size: {
      xs: "-space-x-1",
      s: "-space-x-1.5",
      m: "-space-x-2",
      l: "-space-x-3",
      xl: "-space-x-4",
      "2xl": "-space-x-5",
      "3xl": "-space-x-6",
      "4xl": "-space-x-6",
    },
  },
  defaultVariants: {
    size: "m",
  },
});
