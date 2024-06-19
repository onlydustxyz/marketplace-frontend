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
      brand1: {},
      brand2: {},
      brand3: {},
      brand4: {},
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
