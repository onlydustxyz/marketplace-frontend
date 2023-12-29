import { tv, VariantProps } from "tailwind-variants";

export type CardVariants = VariantProps<typeof cardVariants>;

export const cardVariants = tv({
  base: "rounded-2xl font-walsheim",
  variants: {
    hasBackground: {
      true: "bg-whiteFakeOpacity-2",
    },
    isFullWidth: {
      true: "w-full",
    },
    hasPadding: {
      true: "p-4 lg:p-6",
    },
    cursor: {
      true: "cursor-pointer",
    },
    border: {
      light: "border border-greyscale-50/8",
      medium: "border border-greyscale-50/12",
      multiColor: "border-multicolored before:rounded-2xl",
    },
  },
  defaultVariants: {
    hasBackground: true,
    isFullWidth: true,
    hasPadding: true,
    border: "light",
  },
});
