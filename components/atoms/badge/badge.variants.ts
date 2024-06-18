import { tv } from "tailwind-variants";

export const BadgeCoreVariants = tv({
  slots: {
    base: "group flex items-center justify-center overflow-hidden rounded",
    contentWrapper: "flex items-center justify-center text-inherit",
    content: "text-inherit",
  },
  variants: {
    colors: {
      default: {
        base: "border border-container-stroke-separator bg-container-stroke-separator",
      },
      brand1: {
        base: "border border-brand1 bg-brand1 text-text-1",
      },
      brand2: {
        base: "border border-brand2 bg-brand2 text-text-1",
      },
      brand3: {
        base: "border border-brand3 bg-brand3 text-text-1",
      },
      brand4: {
        base: "border border-brand4 bg-brand4 text-text-1",
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
    style: {
      fill: {
        base: "border-none",
      },
      outline: {
        base: "bg-transparent",
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
    colors: "default",
    style: "fill",
  },
});
