import { cn } from "src/utils/cn";
import React, { ElementType, PropsWithChildren } from "react";
import { TagBorderColor, TagSize } from "./tag.types";
import { getBorderColorClass, getSizeClass } from "./tag.utils";

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
      className={cn("w-fit shrink-0 overflow-hidden rounded-full p-px blur-0", className)}
      onClick={onClick}
    >
      <div
        className={cn(
          "xl:min-h-7 relative flex w-fit items-center justify-center gap-1 rounded-full font-walsheim font-normal text-white",
          getSizeClass(size),
          getBorderColorClass(borderColor, isOpaque),
          { "bg-spaceBlue-900": borderColor === "multi-color" || isOpaque }
        )}
      >
        {children}
      </div>
    </Component>
  );
}
