import { tv } from "tailwind-variants";

export const TagDefaultVariants = tv({
  slots: {
    base: "group block border-1 border-container-stroke-separator bg-container-4 transition-colors data-[clickable=true]:cursor-pointer",
    content: "flex flex-row items-center justify-center text-text-1",
    label: "text-inherit",
    deletableIcon: "text-inherit",
    dropDownIcon: "text-inherit",
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
    isDeletable: {
      true: "",
    },
    hideText: {
      true: "",
    },
    shape: {
      round: {
        base: "rounded-full",
      },
      square: {
        base: "rounded-lg",
      },
    },
    style: {
      false: "",
      outline: {
        base: "!bg-transparent",
      },
      fill: {
        base: "!border-none",
      },
    },
    color: {
      false: "",
      black: {
        base: "border-container-action bg-container-action data-[clickable=true]:hover:!border-interactions-black-hover",
      },
      white: {
        base: "border-container-inverse bg-container-inverse data-[clickable=true]:hover:!border-interactions-white-hover",
      },
      red: {
        base: "border-label-red bg-label-red data-[clickable=true]:hover:!border-interactions-white-hover",
      },
      pink: {
        base: "border-label-pink bg-label-pink data-[clickable=true]:hover:!border-interactions-white-hover",
      },
      grey: {
        base: "border-label-grey bg-label-grey data-[clickable=true]:hover:!border-interactions-white-hover",
      },
      green: {
        base: "border-label-green bg-label-green data-[clickable=true]:hover:!border-interactions-white-hover",
      },
      yellow: {
        base: "border-label-yellow bg-label-yellow data-[clickable=true]:hover:!border-interactions-white-hover",
      },
      orange: {
        base: "border-label-orange bg-label-orange data-[clickable=true]:hover:!border-interactions-white-hover",
      },
      purple: {
        base: "border-label-purple bg-label-purple data-[clickable=true]:hover:!border-interactions-white-hover",
      },
      blue: {
        base: "border-label-blue bg-label-blue data-[clickable=true]:hover:!border-interactions-white-hover",
      },
    },
  },
  compoundVariants: [
    // HIDE TEXT VARIANTS
    {
      hideText: true,
      size: "m",
      class: {
        base: "px-3 py-3",
      },
    },
    {
      hideText: true,
      size: "s",
      class: {
        base: "px-2 py-2",
      },
    },
    {
      hideText: true,
      size: "xs",
      class: {
        base: "px-1 py-1",
      },
    },
    /** COLORS */
    {
      color: "white",
      style: "fill",
      class: {
        content: "text-text-4",
      },
    },
    {
      color: "black",
      style: "outline",
      class: {
        content: "text-text-4",
      },
    },
  ],
  defaultVariants: {
    size: "m",
    shape: "round",
    hideText: false,
    style: "fill",
    deletable: false,
  },
});
