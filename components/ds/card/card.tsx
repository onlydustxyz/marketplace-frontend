import { cn } from "src/utils/cn";

import { TCard } from "./card.types";
import { cardVariants } from "./card.variants";

export function Card({
  as: Component = "article",
  className,
  dataTestId,
  onClick,
  href,
  children,
  noHover,
  ...props
}: TCard.Props) {
  const isClickable = !!onClick || !!href || props.clickable;
  return (
    <Component
      className={cn(
        cardVariants({
          ...props,
          cursor: isClickable,
          clickable: isClickable,
        }),
        {
          "duration-200 ease-in hover:border hover:border-card-border-heavy":
            isClickable && props.border !== "multiColor" && !props.isWarning && !noHover,
        },
        className
      )}
      data-testid={dataTestId}
      onClick={onClick}
      href={href}
    >
      {isClickable ? (
        <div
          className={cn(
            "absolute right-0 top-0 -z-[1] h-full w-full overflow-hidden rounded-2xl after:transition-all",
            "after:duration-200 after:ease-in",
            "after:absolute after:right-0 after:top-0 after:h-full after:w-full after:rounded-2xl after:bg-card-background-medium after:opacity-0",
            {
              "group-hover:after:opacity-100": !noHover,
            }
          )}
        />
      ) : null}
      {children}
    </Component>
  );
}
