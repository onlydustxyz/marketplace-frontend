import { tv } from "tailwind-variants";

export const ModalNextUiVariants = tv({
  slots: {
    modal: "group max-w-[500px] rounded-xl p-0",
    body: "p-4",
    backdrop: "bg-container-backdrop",
    header: "flex items-center justify-between gap-4 p-4 pb-0",
    footer: "flex items-center justify-between gap-4 p-4",
  },
});
