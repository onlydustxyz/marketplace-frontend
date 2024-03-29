import { tv } from "tailwind-variants";

export const projectLeadInvitationBannerVariants = tv({
  slots: {
    base: "bg-rainbow relative flex animate-wave flex-row items-center justify-between gap-5 overflow-hidden rounded-xl font-medium after:pointer-events-none after:absolute after:h-full after:w-full after:bg-noise-light sm:flex-row",
    title: "flex flex-1 text-left font-walsheim text-base md:flex-auto",
  },
  variants: {
    size: {
      s: {
        base: "min-h-[60px] p-3",
        title: "text-sm",
      },
      m: {
        base: "min-h-[80px] p-4",
        title: "text-md",
      },
      l: {
        base: "min-h-[96px] p-5",
        title: "text-lg",
      },
    },
  },
  defaultVariants: {
    size: "s",
  },
});
