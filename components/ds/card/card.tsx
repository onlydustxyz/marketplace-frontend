import { ElementType, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";
import { cardVariants, CardVariants } from "./card.variants.ts";

interface CardProps extends PropsWithChildren, CardVariants {
  as?: ElementType;
  className?: string;
  dataTestId?: string;
  onClick?: () => void;
}

export default function Card({
  as: Component = "div",
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
