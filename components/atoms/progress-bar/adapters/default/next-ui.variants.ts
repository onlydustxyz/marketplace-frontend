import { tv } from "tailwind-variants";

export const ProgressBarNextUiVariants = tv({
  slots: {
    base: "h-2",
    track: "border border-container-stroke-separator bg-interactions-black-disabled",
    indicator: "",
  },
  variants: {
    color: {
      "brand-1": {
        indicator: "bg-brand-1",
      },
      "brand-2": {
        indicator: "bg-brand-2",
      },
      "brand-3": {
        indicator: "bg-brand-3",
      },
      "brand-4": {
        indicator: "bg-brand-4",
      },
    },
  },
  defaultVariants: {
    color: "brand-2",
  },
});
