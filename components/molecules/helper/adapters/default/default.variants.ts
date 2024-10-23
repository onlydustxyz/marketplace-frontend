import { tv } from "tailwind-variants";

export const HelperDefaultVariants = tv({
  slots: {
    base: "flex h-auto w-full flex-col gap-4 rounded-xl bg-brand-1 p-4 text-text-1",
    endContainer: "flex flex-1 flex-row items-center justify-end gap-3",
  },
  variants: {
    size: {
      m: "",
    },
    container: {
      "brand-1": { base: "bg-brand-1" },
      "brand-2": { base: "bg-brand-2" },
      "brand-3": { base: "bg-brand-3" },
      "brand-4": { base: "bg-brand-4" },
      "container-1": { base: "bg-container-1" },
      "container-2": { base: "bg-container-2" },
      "container-3": { base: "bg-container-3" },
      "container-4": { base: "bg-container-4" },
      danger: { base: "bg-interactions-error-active" },
    },
    layout: {
      horizontal: "",
      vertical: {
        base: "w-fit max-w-full flex-col items-start justify-start",
      },
    },
  },
  defaultVariants: {
    container: "brand-2",
    size: "m",
  },
});
