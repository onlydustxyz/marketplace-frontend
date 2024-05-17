import { tv } from "tailwind-variants";

export const linkVariants = tv({
  base: "group/link text-snow hover:text-spacePurple-300",
  variants: {
    size: {
      s: "od-text-body-s",
      m: "od-text-body-m",
    },
    clamp: {
      0: "inline-flex items-center truncate",
      1: "line-clamp-1",
    },
  },
  defaultVariants: {
    size: "s",
    clamp: 0,
  },
});
