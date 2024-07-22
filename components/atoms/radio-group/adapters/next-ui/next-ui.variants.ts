import { tv } from "tailwind-variants";

export const RadioGroupNextUiVariants = tv({
  slots: {
    base: "flex flex-row gap-1",
    item: "group cursor-pointer !select-all",
    indicator: "relative h-4 w-4 rounded-full border-2 transition-colors",
    indicatorIcon:
      "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity",
  },
  variants: {
    color: {
      black: {
        indicator:
          "border-interactions-black-default group-hover:border-interactions-black-hover group-hover:bg-interactions-black-hover",
      },
      white: {
        indicator:
          "border-interactions-white-default group-hover:border-interactions-white-hover group-hover:bg-interactions-white-hover",
      },
    },

    isDisabled: {
      true: "",
    },

    isActive: {
      true: "",
    },

    mixed: {
      true: "",
    },
  },
  compoundVariants: [
    {
      color: "white",
      isActive: true,
      class: {
        indicator:
          "border-interactions-white-default bg-interactions-white-default group-hover:border-interactions-white-hover group-hover:bg-interactions-white-hover",
        indicatorIcon: "text-interactions-black-active",
      },
    },
    {
      color: "white",
      isMixed: true,
      class: {
        indicator:
          "border-interactions-white-default bg-interactions-white-default group-hover:border-interactions-white-hover group-hover:bg-interactions-white-hover",
      },
    },
    {
      color: "white",
      isDisabled: true,
      class: {
        indicator: "border-interactions-white-disabled",
      },
    },

    {
      color: "black",
      isActive: true,
      class: {
        indicator:
          "border-interactions-black-active bg-interactions-black-active group-hover:border-interactions-black-hover group-hover:bg-interactions-black-hover",
        indicatorIcon: "text-interactions-white-active",
      },
    },
    {
      color: "black",
      isMixed: true,
      class: {
        indicator:
          "border-interactions-black-active bg-interactions-black-active group-hover:border-interactions-black-hover group-hover:bg-interactions-black-hover",
      },
    },
    {
      color: "black",
      isDisabled: true,
      class: {
        indicator: "border-interactions-black-disabled",
      },
    },
  ],
  defaultVariants: {
    color: "white",
  },
});
