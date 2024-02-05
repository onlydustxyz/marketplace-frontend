import { tv } from "tailwind-variants";

export const linkVariants = tv({
  base: "group/link inline-flex items-center gap-1 truncate text-snow hover:text-spacePurple-300",
  variants: {
    size: {
      s: "od-text-body-s",
      m: "od-text-body-m",
    },
  },
  defaultVariants: {
    size: "s",
  },
});
