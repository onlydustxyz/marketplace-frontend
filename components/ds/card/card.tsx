import React, { ElementType, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";
import { CardBorder } from "./card.types";
import { cardVariants, CardVariants } from "@/components/ds/card/card.variants.ts";

interface CardProps extends PropsWithChildren, CardVariants {
  as?: ElementType;
  className?: string;
  dataTestId?: string;
  border?: CardBorder;
  hasPadding?: boolean;
  isFullWidth?: boolean;
  hasBackground?: boolean;
  onClick?: () => void;
}

export default function Card({
  as: Component = "div",
  className = "",
  dataTestId,
  border = "light",
  hasPadding = true,
  isFullWidth = true,
  hasBackground = true,
  onClick,
  children,
}: CardProps) {
  return (
    <Component
      className={cn(
        cardVariants({
          hasBackground,
          isFullWidth,
          hasPadding,
          cursor: !!onClick,
          border,
        }),
        className
      )}
      data-testid={dataTestId}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
