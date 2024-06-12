import { tv } from "tailwind-variants";

export const ButtonCoreVariants = tv({
  base: "",
  slots: {
    wrapper: "",
    icon: "",
  },
  variants: {
    size: {
      s: "w-6",
      m: "w-8",
    },
  },
  defaultVariants: {
    size: "s",
  },
});
