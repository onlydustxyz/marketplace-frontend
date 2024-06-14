import { tv } from "tailwind-variants";

export const TagCoreVariants = tv({
  slots: {
    base: "group",
    content: "flex flex-row items-center justify-center",
    startIcon: "",
  },
  variants: {
    size: {
      m: {
        base: "px-3 py-3",
        content: "gap-2",
      },
      s: {
        base: "px-3 py-2",
        content: "gap-2",
      },
      xs: {
        base: "px-2 py-1",
        content: "gap-1.5",
      },
    },
    deletable: {
      true: "",
    },
    iconOnly: {
      true: "",
    },
    display: {
      rounded: "rounded-full",
      square: "rounded-lg",
    },
  },
  compoundVariants: [
    {
      iconOnly: true,
      size: "m",
      class: {
        base: "px-3 py-3",
      },
    },
    {
      iconOnly: true,
      size: "s",
      class: {
        base: "px-2 py-2",
      },
    },
    {
      iconOnly: true,
      size: "xs",
      class: {
        base: "px-1 py-1",
      },
    },
  ],
  defaultVariants: {},
});
