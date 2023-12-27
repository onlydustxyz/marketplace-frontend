import { TagBorderColor, TagSize } from "./tag.types";
import { cn } from "../../../src/utils/cn";

function getSizeClass(size: TagSize): string {
  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1.5 text-sm",
    large: "px-4 py-1.5 text-sm",
  };
  return sizeClasses[size];
}

function getBorderColorClass(borderColor: TagBorderColor, isOpaque: boolean): string {
  const borderColorClasses = {
    grey: cn({ "border border-greyscale-50/8": !isOpaque, "bg-white/2": !isOpaque }),
    orange: cn({ "border border-orange-500": !isOpaque, "bg-white/2": !isOpaque }),
    "multi-color":
      "before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen before:animate-spin-invert-slow before:rounded-full before:bg-multi-color-gradient",
  };
  return borderColorClasses[borderColor];
}

export { getSizeClass, getBorderColorClass };
