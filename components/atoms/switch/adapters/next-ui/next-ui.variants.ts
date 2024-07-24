import { tv } from "tailwind-variants";

export const SwitchNextUiVariants = tv({
  slots: {
    base: "h-4 w-[28px] max-w-[28px]",
    wrapper: "m-0 h-4 w-full p-0.5",
    thumb: "h-3 w-3 group-data-[selected=true]:ml-3",
    label: "",
    startContent: "",
    endContent: "",
    thumbIcon: "",
  },
  variants: {
    isDisabled: {
      true: "",
    },
    isActive: {
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
  ],
  defaultVariants: {
    isDisabled: false,
    isActive: true,
  },
});
