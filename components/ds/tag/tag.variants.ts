import { tv } from "tailwind-variants";

export const tagVariants = tv({
  base: "xl:min-h-7 relative flex w-fit items-center justify-center gap-1 rounded-full font-walsheim font-normal text-white",
  variants: {
    size: {
      small: "px-2 py-1 text-xs",
      medium: "px-3 py-1.5 text-sm",
      large: "px-4 py-1.5 text-sm",
    },
    borderColor: {
      grey: "border border-greyscale-50/8 bg-white/2",
      orange: "border border-orange-500 bg-white/2",
      "multi-color":
        "bg-spaceBlue-900 before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen before:animate-spin-invert-slow before:rounded-full before:bg-multi-color-gradient",
    },
    color: {
      grey: "text-white",
      orange: "text-orange-500",
    },
    isOpaque: {
      true: "bg-spaceBlue-900",
    },
  },
  defaultVariants: {
    size: "small",
    borderColor: "grey",
    color: "grey",
    isOpaque: false,
  },
});
