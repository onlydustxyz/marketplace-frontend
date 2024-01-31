import { tv } from "tailwind-variants";

export const cardVariants = tv({
  base: "rounded-2xl font-walsheim",
  variants: {
    isFullWidth: {
      true: "w-full",
    },
    hasPadding: {
      true: "p-4 lg:p-6",
      false: "p-0 lg:p-0",
    },
    cursor: {
      true: "cursor-pointer",
    },
    border: {
      light: "border border-card-border-light",
      medium: "border border-card-border-medium",
      heavy: "border border-card-border-heavy",
      multiColor: "border-multicolored before:pointer-events-none before:rounded-2xl",
    },
    background: {
      light: "bg-card-background-light",
      medium: "bg-card-background-medium",
      heavy: "bg-card-background-heavy",
      base: "bg-card-background-base",
    },
    clickable: {
      true: "group relative z-[1] transition-all",
    },
  },
  defaultVariants: {
    isFullWidth: true,
    hasPadding: true,
    border: "light",
    background: "light",
  },
});
