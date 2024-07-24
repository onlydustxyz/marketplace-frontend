import { tv } from "tailwind-variants";

export const SwitchNextUiVariants = tv({
  slots: {
    base: "",
    wrapper: "m-0",
    thumb: "",
    label: "",
    startContent: "",
    endContent: "",
    thumbIcon: "",
  },
  variants: {
    isDisabled: {
      true: "",
    },
    mixed: {
      true: "",
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      class: {
        wrapper: "",
      },
    },
    {
      mixed: true,
      class: {
        thumb: "",
      },
    },
  ],
  defaultVariants: {
    isDisabled: false,
  },
});
