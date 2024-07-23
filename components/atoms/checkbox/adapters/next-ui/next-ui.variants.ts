import { tv } from "tailwind-variants";

export const CheckboxNextUiVariants = tv({
  slots: {
    base: "",
    label: "",
    wrapper: "m-0 h-4 w-4 rounded before:rounded after:rounded",
    icon: "text-text-4",
  },
  variants: {
    color: {
      white: {
        wrapper:
          "before:border-interactions-white-default after:bg-interactions-white-active group-data-[hover=true]:before:bg-interactions-white-default",
      },
      black: {
        wrapper:
          "before:border-interactions-black-default after:bg-interactions-black-active group-data-[hover=true]:before:bg-interactions-black-default",
        icon: "text-text-1",
      },
    },
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
      color: "white",
      class: {
        wrapper: "group-data-[hover=true]:before:transparent before:border-interactions-white-disabled",
      },
    },
    {
      mixed: true,
      color: "white",
      class: {
        wrapper: "before:border-interactions-white-active after:bg-transparent",
        icon: "text-interactions-white-active",
      },
    },
    {
      isDisabled: true,
      color: "black",
      class: {
        wrapper: "group-data-[hover=true]:before:transparent before:border-interactions-black-disabled",
      },
    },
    {
      mixed: true,
      color: "black",
      class: {
        wrapper: "before:border-interactions-black-active after:bg-transparent",
        icon: "text-interactions-black-active",
      },
    },
  ],
  defaultVariants: {
    color: "white",
  },
});
