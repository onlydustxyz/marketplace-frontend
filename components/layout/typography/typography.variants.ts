import { tv } from "tailwind-variants";

export const typographyVariants = tv({
  variants: {
    variant: {
      "title-xl": "od-text-title-xl",
      "title-l": "od-text-title-l",
      "title-m": "od-text-title-m",
      "title-s": "od-text-title-s",
      "body-xl": "od-text-body-xl",
      "body-xl-bold": "od-text-body-xl-bold",
      "body-l": "od-text-body-l",
      "body-l-bold": "od-text-body-l-bold",
      "body-m": "od-text-body-m",
      "body-m-bold": "od-text-body-m-bold",
      "body-s": "od-text-body-s",
      "body-s-bold": "od-text-body-s-bold",
      "body-xs": "od-text-body-xs",
      "body-xs-bold": "od-text-body-xs-bold",
      "special-label": "od-text-special-label",
    },
  },
  defaultVariants: {
    variant: "body-m",
  },
});
