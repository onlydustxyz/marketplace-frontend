import { tv } from "tailwind-variants";

export const progressbarVariants = tv({
  base: "",
  slots: {
    base: "",
    track: "h-2",
    indicator: "",
    label: "font-medium tracking-wider text-default-600",
    value: "text-foreground/60",
  },
  variants: {
    color: {
      spacePurple: {
        base: "",
        track: "bg-spacePurple-200",
        indicator: "bg-spacePurple-500",
        label: "",
        value: "",
      },
      orange: {
        base: "",
        track: "bg-warning-200",
        indicator: "bg-warning-500",
        label: "",
        value: "",
      },
    },
  },
  defaultVariants: {
    color: "orange",
  },
});
