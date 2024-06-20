import { tv } from "tailwind-variants";

import { DrawerCoreVariants } from "components/molecules/drawer/drawer.variants";

export const DrawerNextUiVariants = tv({
  extend: DrawerCoreVariants,
  slots: {
    base: "border-b-none !m-0 h-[calc(100%_-_24px)] max-w-full rounded-xl rounded-b-none border-1 border-container-stroke-separator bg-container-1 sm:!m-3 sm:rounded-b-xl sm:border-b-1",
    wrapper: "justify-end",
    body: "gap-0 overflow-hidden p-3",
    backdrop: "bg-container-backdrop",
    footer: "border-t-1 border-container-stroke-separator bg-container-1 p-3",
    header: "flex items-center justify-between p-3 pb-0",
  },
  variants: {
    size: {
      m: {
        base: "w-[640px]",
      },
    },
  },
  defaultVariants: {},
});
