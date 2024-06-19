import { tv } from "tailwind-variants";

export const DrawerCoreVariants = tv({
  slots: {
    container: "group",
    body: "",
    header: "",
    footer: "",
  },
  variants: {
    size: {
      md: {
        container: "",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
