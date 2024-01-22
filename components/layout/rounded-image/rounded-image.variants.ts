import { tv } from "tailwind-variants";

export const roundedImageVariants = tv({
  base: "object-cover",
  variants: {
    size: {
      xxs: "h-4 w-4",
      xs: "h-5 w-5",
      xm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
      xl: "h-12 w-12",
    },
    rounding: {
      corners: "rounded-md",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    size: "lg",
    rounding: "corners",
  },
});
