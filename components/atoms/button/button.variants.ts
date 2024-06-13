import { tv } from "tailwind-variants";

export const ButtonCoreVariants = tv({
  slots: {
    base: "group flex flex-row items-center justify-center gap-2 rounded-md bg-container-1",
    startIcon: "",
    endIcon: "",
    content: "",
  },
  variants: {
    size: {
      l: {
        base: "px-3 py-4",
      },
      m: {
        base: "px-2 py-3",
      },
      s: {
        base: "px-1 py-1",
      },
    },
    state: {
      default: {
        base: "",
      },
      loading: {
        base: "",
      },
      disabled: {
        base: "pointer-events-none",
        startIcon: "",
        endIcon: "",
        content: "",
      },
    },
  },
  defaultVariants: {
    size: "m",
    state: "default",
  },
});
