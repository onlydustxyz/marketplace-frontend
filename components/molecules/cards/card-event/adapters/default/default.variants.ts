import { tv } from "tailwind-variants";

export const CardEventDefaultVariants = tv({
  slots: {
    base: "flex w-full flex-col justify-start gap-2 p-3",
  },
  variants: {
    display: {
      planned: {
        base: "bg-container-4",
      },
      terminated: {
        base: "bg-container-3",
      },
      highlight: {
        base: "border-none bg-brand-2",
      },
    },
  },
  defaultVariants: {},
});
