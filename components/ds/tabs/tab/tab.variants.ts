import { tv } from "tailwind-variants";

export const tabVariants = tv({
  base: "",
  slots: {
    icon: "",
    name: "",
    hoverBorder: "",
  },
  variants: {
    color: {
      grey: {
        icon: "text-greyscale-200",
        name: "text-greyscale-200",
        hoverBorder: "bg-greyscale-200",
      },
      blue: {
        icon: "text-spaceBlue-200",
        name: "text-spaceBlue-200",
        hoverBorder: "bg-spaceBlue-200",
      },
    },
  },
  defaultVariants: {
    color: "grey",
  },
});
