import { tv } from "tailwind-variants";

export const ButtonCoreVariants = tv({
  slots: {
    base: "group relative flex w-fit cursor-pointer overflow-hidden rounded-lg bg-container-1 transition-colors",
    content: "flex flex-row items-center justify-center gap-2",
    startIcon: "transition-color text-inherit",
    endIcon: "transition-color text-inherit",
    label: "transition-color leading-none text-inherit",
    loaderContainer: "absolute inset-0 flex h-full w-full flex-row items-center justify-center bg-container-1",
    spinnerCircle: "h-4 w-4 border-b-white",
  },
  variants: {
    size: {
      l: {
        base: "px-4 py-3",
      },
      m: {
        base: "px-3 py-2",
      },
      s: {
        base: "px-1 py-1",
      },
    },
    hideText: {
      true: "",
    },
    isLoading: {
      true: {
        base: "pointer-events-none cursor-not-allowed",
        content: "opacity-0",
      },
    },
    isDisabled: {
      true: {
        base: "pointer-events-none cursor-not-allowed",
        startIcon: "text-text-3",
        endIcon: "text-text-3",
        content: "text-text-3",
        label: "text-text-3",
      },
    },
  },
  compoundVariants: [
    {
      hideText: true,
      size: "l",
      class: {
        base: "px-3 py-3",
      },
    },
    {
      hideText: true,
      size: "m",
      class: {
        base: "px-2 py-2",
      },
    },
    {
      hideText: true,
      size: "s",
      class: {
        base: "px-1 py-1",
      },
    },
  ],
  defaultVariants: {
    size: "m",
    state: "default",
    isDisabled: false,
    isLoading: false,
  },
});
