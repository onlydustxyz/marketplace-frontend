import { tv } from "tailwind-variants";

export const badgeVariants = tv({
  base: "rounded-full bg-spacePurple-900 text-spacePurple-500",
  variants: {
    size: {
      s: "min-w-5 od-text-body-s-bold h-5 gap-0.5 px-1.5 py-0.5",
      m: "min-w-6 od-text-body-m-bold h-6 gap-1 px-2 py-0.5",
      l: "min-w-8 od-text-body-l-bold h-8 gap-1 px-3 py-1",
    },
  },
  defaultVariants: {
    size: "m",
  },
});
