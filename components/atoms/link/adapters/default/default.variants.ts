import { tv } from "tailwind-variants";

export const LinkDefaultVariants = tv({
  slots: {
    base: "group cursor-pointer text-xs text-text-1 underline underline-offset-1",
  },
  variants: {
    color: {
      default: "",
      inverse: {
        base: "text-text-4",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});
