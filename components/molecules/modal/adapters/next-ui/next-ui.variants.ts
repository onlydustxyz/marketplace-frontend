import { tv } from "tailwind-variants";

export const ModalNextUiVariants = tv({
  slots: {
    modal: "scrollbar-sm group max-h-full overflow-y-auto rounded-xl p-0",
    body: "",
    backdrop: "bg-container-backdrop",
    header: "flex items-center justify-between gap-4 p-4 pb-0",
    footer: "flex items-center justify-between gap-4 p-4",
  },
  variants: {
    size: {
      l: { modal: "max-w-[1120px]", body: "p-3" },
      m: { modal: "max-w-[500px]", body: "p-4" },
    },
    container: {
      "1": { modal: "bg-container-1" },
      "2": { modal: "bg-container-2" },
      "3": { modal: "bg-container-3" },
      "4": { modal: "bg-container-4" },
    },
  },
  defaultVariants: {
    size: "m",
    container: "2",
  },
});
