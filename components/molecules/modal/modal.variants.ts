import { tv } from "tailwind-variants";

export const ModalCoreVariants = tv({
  slots: {
    base: "group rounded-xl p-0",
    body: "p-4",
    backdrop: "backdrop-blur-sm",
    header: "flex items-center justify-between gap-4 p-4 pb-0",
    footer: "flex items-center justify-between gap-4 p-4",
  },
  variants: {
    size: {
      s: {
        base: "max-w-[400px]",
      },
      m: {
        base: "max-w-[500px]",
      },
    },
  },
  defaultVariants: {
    size: "m",
  },
});
