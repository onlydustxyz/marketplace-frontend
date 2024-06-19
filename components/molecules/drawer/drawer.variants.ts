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
      m: {},
    },
  },
  defaultVariants: {
    size: "m",
  },
});
