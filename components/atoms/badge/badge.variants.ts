import { tv } from "tailwind-variants";

export const BadgeCoreVariants = tv({
  slots: {
    base: "group flex items-center justify-center overflow-hidden rounded",
    contentWrapper: "flex items-center justify-center text-inherit",
    content: "text-inherit",
  },
  variants: {
    colors: {
      outline: {
        base: "border border-container-stroke-separator",
      },
      brand1: {
        base: "bg-brand1 text-text-1",
      },
      brand2: {
        base: "bg-brand2 text-text-1",
      },
      brand3: {
        base: "bg-brand3 text-text-1",
      },
      brand4: {
        base: "bg-brand4 text-text-1",
      },
    },
    size: {
      s: {
        base: "h-4 w-4",
      },
      m: {
        base: "h-6 w-6",
      },
    },
    fitContent: {
      true: {
        base: "w-fit",
      },
    },
  },
  compoundVariants: [
    {
      fitContent: true,
      size: "m",
      class: {
        base: "px-2",
      },
    },
    {
      fitContent: true,
      size: "s",
      class: {
        base: "px-1",
      },
    },
  ],
  defaultVariants: {
    size: "m",
    colors: "brand1",
  },
});
