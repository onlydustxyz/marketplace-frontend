import { tv } from "tailwind-variants";

export const TypoCoreVariants = tv({
  base: "",
  slots: {
    main: "",
  },
  variants: {
    size: {
      xs: { main: "text-xs" },
      s: { main: "text-sm" },
      m: { main: "text-base" },
      l: { main: "text-lg" },
      xl: { main: "text-xl" },
      "2xl": { main: "text-2xl" },
      "3xl": { main: "text-3xl" },
      "4xl": { main: "text-4xl" },
      "5xl": { main: "text-5xl" },
      "6xl": { main: "text-6xl" },
    },
    weight: {
      regular: { main: "font-normal" },
      medium: { main: "font-medium" },
    },
    variant: {
      default: { main: "font-walsheim" },
      branding: { main: "font-belwe" },
    },
  },
  defaultVariants: {
    weight: "regular",
    variant: "default",
    size: "xs",
  },
});
