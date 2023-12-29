import { cn } from "src/utils/cn";
import React, { ElementType, PropsWithChildren } from "react";
import { TagBorderColor, TagSize } from "./tag.types";
import { tagVariants, TagVariants } from "@/components/ds/tag/tag.variants.ts";

interface TagProps extends PropsWithChildren, TagVariants {
  as?: ElementType;
  id?: string;
  size?: TagSize;
  borderColor?: TagBorderColor;
  testId?: string;
  isOpaque?: boolean;
  className?: string;
  onClick?: () => void;
}

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
      className={cn(tagVariants({ size, borderColor, isOpaque }), className)}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
