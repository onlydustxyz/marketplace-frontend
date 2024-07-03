import { tv } from "tailwind-variants";

export const AvatarGroupDefaultVariants = tv({
  slots: {
    base: "flex",
  },
  variants: {
    size: {
      xxl: {
        base: "-space-x-6",
      },
      xl: {
        base: "-space-x-3.5",
      },
      l: {
        base: "-space-x-3",
      },
      ml: {
        base: "-space-x-2.5",
      },
      m: {
        base: "-space-x-2",
      },
      s: {
        base: "-space-x-1.5",
      },
      xs: {
        base: "-space-x-1",
      },
    },
  },
  defaultVariants: {
    size: "m",
  },
});
