import { cn } from "src/utils/cn";
import { cardVariants } from "./card.variants.ts";
import { TCard } from "./card.types.ts";

export function Card({
  as: Component = "section",
  className = "",
  dataTestId,
  onClick,
  children,
  ...props
}: TCard.Props) {
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
