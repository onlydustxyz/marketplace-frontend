import { tv } from "tailwind-variants";

export const AvatarCoreVariants = tv({
  slots: {
    base: "group",
    img: "",
    fallback: "",
    name: "",
  },
  variants: {
    size: {
      xxl: {},
      xl: {},
      l: {},
      ml: {},
      m: {},
      s: {},
      xs: {},
    },
    shape: {
      round: {},
      square: {},
    },
    container: {
      light: {},
      brand: {},
    },
  },
  defaultVariants: {
    size: "m",
    shape: "round",
    container: "light",
  },
});
