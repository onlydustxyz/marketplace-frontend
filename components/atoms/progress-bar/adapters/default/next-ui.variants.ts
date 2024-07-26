import { tv } from "tailwind-variants";

export const ProgressBarNextUiVariants = tv({
  slots: {
    base: "h-2",
    track: "border border-container-stroke-separator bg-interactions-black-disabled",
    indicator: "bg-brand-2",
  },
  variants: {},
  defaultVariants: {},
});
