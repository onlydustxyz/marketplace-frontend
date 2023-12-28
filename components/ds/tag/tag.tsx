import { cn } from "src/utils/cn";
import React, { ElementType, PropsWithChildren } from "react";
import { TagBorderColor, TagSize } from "./tag.types";
import { tv } from "tailwind-variants";

const tagVariant = tv({
  base: "w-fit shrink-0 overflow-hidden rounded-full p-px blur-0",
  variants: {
    size: {
      small: "px-2 py-1 text-xs",
      medium: "px-3 py-1.5 text-sm",
      large: "px-4 py-1.5 text-sm",
    },
    borderColor: {
      grey: "border border-greyscale-50/8 bg-white/2",
      orange: "border border-orange-500 bg-white/2",
      "multi-color":
        "before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen before:animate-spin-invert-slow before:rounded-full before:bg-multi-color-gradient",
    },
    isOpaque: {
      true: "bg-spaceBlue-900",
      false: "",
    },
  },
  defaultVariants: {
    size: "small",
    borderColor: "grey",
  },
});

type TagProps = PropsWithChildren<{
  as?: ElementType;
  id?: string;
  size?: TagSize;
  borderColor?: TagBorderColor;
  testId?: string;
  isOpaque?: boolean;
  className?: string;
  onClick?: () => void;
}>;

export default function Tag({
  as: Component = "div",
  id,
  size = "small",
  borderColor = "grey",
  testId,
  isOpaque = false,
  children,
  className,
  onClick,
}: TagProps) {
  return (
    <Component
      data-testId={testId}
      id={id}
      className={cn(tagVariant({ size, borderColor, isOpaque }), className)}
      onClick={onClick}
    >
      <div
        className={cn(
          "xl:min-h-7 relative flex w-fit items-center justify-center gap-1 rounded-full font-walsheim font-normal text-white"
        )}
      >
        {children}
      </div>
    </Component>
  );
}
