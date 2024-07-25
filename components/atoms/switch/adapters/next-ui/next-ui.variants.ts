import { tv } from "tailwind-variants";

export const SwitchNextUiVariants = tv({
  slots: {
    base: "h-4 w-[28px] max-w-[28px]",
    wrapper: "m-0 h-4 w-full p-0.5 group-data-[selected=true]:bg-brand-2",
    thumb:
      "h-3 w-3 max-w-3 group-data-[selected=true]:ml-[10px] group-data-[selected]:group-data-[pressed]:ml-[10px] group-data-[pressed=true]:w-3 group-data-[selected=true]:bg-interactions-white-default",
    label: "",
    startContent: "",
    endContent: "",
  },
  variants: {
    isDisabled: {
      true: {
        wrapper: "bg-interactions-white-disabled group-data-[selected=true]:bg-interactions-white-disabled",
        thumb: "bg-interactions-white-disabled group-data-[selected=true]:bg-interactions-white-disabled",
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});
