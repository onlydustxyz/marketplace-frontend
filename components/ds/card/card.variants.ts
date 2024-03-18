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
      false: "border-none",
      light: "border border-card-border-light",
      medium: "border border-card-border-medium",
      heavy: "border border-card-border-heavy",
      spacePurple: "border border-spacePurple-500",
      multiColor: "border-multicolored before:pointer-events-none before:rounded-2xl",
    },
    background: {
      false: "bg-transparent",
      light: "bg-card-background-light",
      medium: "bg-card-background-medium",
      heavy: "bg-card-background-heavy",
      base: "bg-card-background-base",
      "whiteFakeOpacity-1": "bg-whiteFakeOpacity-1",
      "whiteFakeOpacity-2": "bg-whiteFakeOpacity-2",
      "whiteFakeOpacity-5": "bg-whiteFakeOpacity-5",
      "whiteFakeOpacity-8": "bg-whiteFakeOpacity-8",
      "whiteFakeOpacity-12": "bg-whiteFakeOpacity-12",
      spacePurple: "bg-spacePurple-900",
    },
    clickable: {
      true: "group relative z-[1] transition-all",
    },

    isWarning: {
      true: "border border-orange-500 bg-orange-900",
    },
    isError: {
      true: "border border-github-red bg-[#2B0000]",
    },
  },
  defaultVariants: {
    isFullWidth: true,
    isError: undefined,
    isWarning: undefined,
    hasPadding: true,
    border: "light",
    background: "light",
  },
});
