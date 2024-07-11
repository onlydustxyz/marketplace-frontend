import { tv } from "tailwind-variants";

export const TypoDefaultVariants = tv({
  slots: {
    base: "text-text-1",
  },
  variants: {
    size: {
      xxs: { base: "text-[11px]" },
      xs: { base: "text-xs" },
      s: { base: "text-sm" },
      m: { base: "text-base" },
      l: { base: "text-lg" },
      xl: { base: "text-xl" },
      "2xl": { base: "text-2xl" },
      "3xl": { base: "text-3xl" },
      "4xl": { base: "text-4xl" },
      "5xl": { base: "text-5xl" },
      "6xl": { base: "text-6xl" },
    },
    weight: {
      regular: { base: "font-normal" },
      medium: { base: "font-medium" },
    },
    color: {
      "text-1": { base: "text-text-1" },
      "text-2": { base: "text-text-2" },
      "text-3": { base: "text-text-3" },
      "text-4": { base: "text-text-4" },
    },
    variant: {
      default: { base: "font-walsheim" },
      brand: { base: "font-belwe" },
    },
  },
  defaultVariants: {
    weight: "regular",
    variant: "default",
    size: "m",
    color: "text-1",
  },
});
