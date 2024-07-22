import { tv } from "tailwind-variants";

export const BadgeDefaultVariants = tv({
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
      "brand-1": {
        base: "border border-brand-1 bg-brand-1 text-text-1",
      },
      "brand-2": {
        base: "border border-brand-2 bg-brand-2 text-text-1",
      },
      "brand-3": {
        base: "border border-brand-3 bg-brand-3 text-text-1",
      },
      "brand-4": {
        base: "border border-brand-4 bg-brand-4 text-text-1",
      },
    },
    size: {
      s: {
        base: "h-4 min-h-4 w-4 min-w-4",
      },
      m: {
        base: "h-6 min-h-6 w-6 min-w-6",
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
