import { tv } from "tailwind-variants";

export const InputCoreVariants = tv({
  slots: {
    container: "",
    input: "",
    label: "",
  },
  variants: {
    isDisabled: {
      true: "",
    },
    isError: {
      true: "",
    },
  },
  defaultVariants: {},
});
