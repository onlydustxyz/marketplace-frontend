import { tv } from "tailwind-variants";

export const BadgeCoreVariants = tv({
  slots: {
    base: "group",
    contentWrapper: "",
    content: "",
  },
  variants: {
    colors: {
      default: {},
      "brand-1": {},
      "brand-2": {},
      "brand-3": {},
      "brand-4": {},
    },
    size: {
      s: {},
      m: {},
    },
    fitContent: {
      true: {},
    },
    style: {
      fill: {},
      outline: {},
    },
  },
  defaultVariants: {
    size: "m",
    colors: "default",
    style: "fill",
  },
});
