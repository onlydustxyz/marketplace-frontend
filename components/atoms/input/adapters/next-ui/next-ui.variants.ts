import { tv } from "tailwind-variants";

export const InputNextUiVariants = tv({
  slots: {
    base: "h-fit flex-col items-start gap-2",
    mainWrapper: "",
    inputWrapper:
      "rounded-md border border-container-stroke-separator px-4 py-3 text-text-1 !outline-none group-data-[focus=true]:border-interactions-white-hover group-data-[hover=true]:border-interactions-white-hover",
    innerWrapper: "",
    input: "text-sm text-text-1",
    errorMessage: "",
    label: "text-xs text-text-1",
    helperWrapper: "",
    description: "",
  },
  variants: {
    isDisabled: {
      true: {
        base: "!opacity-100",
        inputWrapper: "bg-interactions-white-disabled",
      },
    },
    isError: {
      true: {
        inputWrapper: "!border-interactions-error-active !text-interactions-error-active",
        input: "!text-interactions-error-active",
        label: "!text-interactions-error-active",
      },
    },
  },
  defaultVariants: {},
});
