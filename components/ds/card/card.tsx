import React, { ElementType, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";
import { cardVariants, CardVariants } from "@/components/ds/card/card.variants";

interface CardProps extends PropsWithChildren, CardVariants {
  as?: ElementType;
  className?: string;
  dataTestId?: string;
  onClick?: () => void;
}

export default function Card({
  as: Component = "section",
  className = "",
  dataTestId,
  onClick,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        cardVariants({
          ...props,
          cursor: !!onClick,
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
