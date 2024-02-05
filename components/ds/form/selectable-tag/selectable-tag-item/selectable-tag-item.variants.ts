import { tv } from "tailwind-variants";

import { cn } from "src/utils/cn";

export const selectableTagItemVariants = tv({
  base: cn(
    "od-text-body-xs relative inline-flex h-fit w-fit items-center justify-center gap-1 rounded-lg border border-greyscale-50/8 bg-whiteFakeOpacity-10 px-2 py-1 text-neutral-100 shadow-heavy transition-all",
    "duration-300 ease-in before:duration-300 before:ease-in before:transition-all",
    "before:absolute before:-inset-0.5 before:rounded-lg before:border-2 before:border-transparent"
  ),
  variants: {
    selected: {
      true: "bg-spacePurple-900 before:absolute before:border-spacePurple-500",
    },
    disabled: {
      true: "pointer-events-none opacity-50",
    },
  },
  compoundVariants: [
    {
      disabled: false,
      selected: false,
      class:
        "hover:border-spacePurple-500 hover:bg-spacePurple-900 hover:before:absolute hover:before:-inset-0.5 hover:before:rounded-lg",
    },
  ],
});
