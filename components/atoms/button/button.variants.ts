import { tv } from "tailwind-variants";

export const ButtonCoreVariants = tv({
  slots: {
    base: "group relative w-fit cursor-pointer overflow-hidden rounded-md bg-container-1 transition-background",
    content: "flex flex-row items-center justify-center gap-2",
    startIcon: "",
    endIcon: "",
    label: "",
    loaderContainer: "absolute inset-0 flex h-full w-full flex-row items-center justify-center bg-container-1",
    spinnerCircle: "h-4 w-4 border-b-white",
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
    display: {
      default: "",
      icon: "",
      loader: {
        content: "opacity-0",
      },
    },
    state: {
      default: "",
      loading: {
        base: "pointer-events-none cursor-not-allowed",
      },
      disabled: {
        base: "pointer-events-none cursor-not-allowed",
        startIcon: "text-text-3",
        endIcon: "text-text-3",
        content: "text-text-3",
      },
    },
  },
  compoundVariants: [
    {
      display: "icon",
      size: "l",
      class: {
        base: "px-3 py-3",
      },
    },
    {
      display: "icon",
      size: "m",
      class: {
        base: "px-2 py-2",
      },
    },
    {
      display: "icon",
      size: "s",
      class: {
        base: "px-1 py-1",
      },
    },
  ],
  defaultVariants: {
    size: "m",
    state: "default",
  },
});
