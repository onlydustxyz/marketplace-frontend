import { tv } from "tailwind-variants";

export const AvatarCoreVariants = tv({
  slots: {
    base: "group relative box-content flex flex-shrink-0 items-center justify-center overflow-hidden border-1 border-container-stroke-separator",
    img: "h-full w-full object-cover object-center",
    fallback: "h-full w-full",
    name: "",
    icon: "",
  },
  variants: {
    size: {
      xxl: {
        base: "h-24 w-24",
      },
      xl: {
        base: "h-12 w-12",
      },
      l: {
        base: "h-11 w-11",
      },
      ml: {
        base: "h-9 w-9",
      },
      m: {
        base: "h-8 w-8",
      },
      s: {
        base: "h-6 w-6",
      },
      xs: {
        base: "h-4 w-4",
      },
    },
    shape: {
      round: {
        base: "rounded-full",
      },
      square: {
        base: "rounded-md",
      },
    },
    background: {
      light: {
        base: "bg-container-4",
      },
      brand: {
        // for later
        base: "bg-container-4",
      },
    },
  },
  defaultVariants: {},
});
