import { tv } from "tailwind-variants";

export const bannerVariants = tv({
  base: "",
  slots: {
    wrapper: "flex items-center justify-between gap-4",
    contentWrapper: "flex flex-1 items-center justify-start gap-3",
    icon: "",
    iconWrapper: "flex items-center justify-center bg-card-background-heavy",
    title: "",
    description: "",
  },
  variants: {
    size: {
      l: {
        wrapper: "rounded-2xl px-6 py-5",
        iconWrapper: "h-14 w-14 rounded-2xl",
        icon: "h-8 w-8",
        title: "od-text-body-l-bold",
        description: "od-text-body-m",
      },
      m: {
        wrapper: "rounded-xl p-4",
        iconWrapper: "h-12 w-12 rounded-xl",
        icon: "h-6 w-6",
        title: "od-text-body-m-bold",
        description: "od-text-body-xs",
      },
      s: {
        wrapper: "rounded-lg p-3",
        iconWrapper: "h-9 w-9 rounded-lg",
        icon: "h-5 w-5",
        title: "od-text-body-s-bold",
        description: "od-text-body-xs",
      },
    },
    variant: {
      rainbow: {
        wrapper:
          "bg-rainbow relative animate-wave overflow-hidden after:pointer-events-none after:absolute after:h-full after:w-full after:bg-noise-light",
      },
      orange: {
        wrapper: "bg-orange-800",
      },
      red: {
        wrapper: "bg-[#360000]",
      },
      light: {
        wrapper: "bg-card-background-light",
      },
      medium: {
        wrapper: "bg-card-background-medium",
      },
      heavy: {
        wrapper: "bg-card-background-heavy",
      },
    },
    hasBorder: {
      true: "",
    },
  },
  compoundVariants: [
    {
      variant: "orange",
      hasBorder: true,
      class: {
        wrapper: "border border-orange-500",
      },
    },
    {
      variant: "light",
      hasBorder: true,
      class: {
        wrapper: "border border-card-border-light",
      },
    },
    {
      variant: "medium",
      hasBorder: true,
      class: {
        wrapper: "border border-card-border-medium",
      },
    },
    {
      variant: "heavy",
      hasBorder: true,
      class: {
        wrapper: "border border-card-border-heavy",
      },
    },
  ],
  defaultVariants: {
    size: "m",
    variant: "medium",
  },
});
