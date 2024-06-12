import { tv } from "tailwind-variants";

export const ButtonCoreVariants = tv({
  base: "",
  slots: {
    wrapper: "flex flex-row items-center justify-center gap-2 rounded-md bg-container-1",
    startIcon: "",
    endIcon: "",
    content: "",
  },
  variants: {
    size: {
      l: {
        wrapper: "px-3 py-4",
      },
      m: {
        wrapper: "px-2 py-3",
      },
      s: {
        wrapper: "px-1 py-1",
      },
    },
    state: {
      default: {
        wrapper: "",
      },
      loading: {
        wrapper: "",
      },
      disabled: {
        wrapper: "bg-container-2",
        startIcon: "!text-text-3",
        endIcon: "!text-text-3",
        content: "!text-text-3",
      },
    },
  },
  defaultVariants: {
    size: "m",
    state: "default",
  },
});
