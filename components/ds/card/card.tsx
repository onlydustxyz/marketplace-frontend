import { cn } from "src/utils/cn";

import { TCard } from "./card.types";
import { cardVariants } from "./card.variants";

export function Card({ as: Component = "article", className, dataTestId, onClick, children, ...props }: TCard.Props) {
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
