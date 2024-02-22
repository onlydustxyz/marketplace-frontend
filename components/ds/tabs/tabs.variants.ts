import { tv } from "tailwind-variants";

export const tabsVariants = tv({
  base: "",
  slots: {
    tabList: "",
  },
  variants: {
    border: {
      true: {
        tabList: "border-b border-card-border-light",
      },
      false: {
        tabList: "border-none",
      },
    },
  },
  defaultVariants: {
    border: true,
  },
});
