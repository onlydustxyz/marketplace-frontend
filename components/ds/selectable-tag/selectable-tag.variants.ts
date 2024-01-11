import { tv } from "tailwind-variants";

export const selectableTagVariants = tv({
  base: "od-text-body-xs relative inline-flex h-fit w-fit items-center justify-center gap-1 rounded-lg border border-greyscale-50/8 bg-whiteFakeOpacity-10 px-2 py-1 text-neutral-100",
  variants: {
    selected: {
      true: "bg-spacePurple-900 before:absolute before:-inset-0.5 before:rounded-lg before:border-2 before:border-spacePurple-500",
    },
  },
});
