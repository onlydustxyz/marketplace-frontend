import { tv } from "tailwind-variants";

export const tagVariants = tv({
  slots: {
    base: "xl:min-h-7 relative flex w-fit items-center justify-center gap-1 font-walsheim font-normal text-white",
    container: "relative isolate w-fit shrink-0 overflow-hidden p-px",
  },
  variants: {
    size: {
      small: {
        base: "px-2 py-1 text-xs",
      },
      medium: {
        base: "px-3 py-1.5 text-sm",
      },
      large: {
        base: "px-4 py-1.5 text-sm",
      },
    },
    borderColor: {
      grey: {
        base: "border border-greyscale-50/8 bg-white/2",
      },
      orange: {
        base: "border border-orange-500 bg-white/2",
      },
      red: {
        base: "border border-github-red bg-white/2",
      },
      "multi-color": {
        base: "bg-spaceBlue-900 before:absolute before:-z-10 before:w-[calc(100%_*_2)] before:animate-spin-invert-slow before:rounded-full before:bg-multi-color-gradient before:aspect-square",
      },
    },
    color: {
      grey: {
        base: "text-white",
      },
      orange: {
        base: "text-orange-500",
      },
      red: {
        base: "text-github-red",
      },
    },
    isOpaque: {
      true: {
        base: "bg-spaceBlue-900",
      },
    },
    shape: {
      round: {
        base: "rounded-full",
        container: "rounded-full",
      },
      square: {
        base: "rounded-lg",
        container: "rounded-lg",
      },
    },
  },
  defaultVariants: {
    size: "small",
    borderColor: "grey",
    color: "grey",
    isOpaque: false,
    shape: "round",
  },
});
