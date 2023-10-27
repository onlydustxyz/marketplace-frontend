import { FC, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";

export type justify = "normal" | "start" | "end" | "center" | "between" | "around";
export type item = "start" | "end" | "center";
export type direction = "row" | "col" | "row-reverse" | "col-reverse";
export type wrap = "nowrap" | "wrap" | "wrap-reverse";

export interface FlexProps extends PropsWithChildren {
  justify?: justify;
  item?: item;
  direction?: direction;
  wrap?: wrap;
  gap?: number;
  className?: string;
}

export const Flex: FC<FlexProps> = ({
  justify = "start",
  item = "start",
  direction = "row",
  wrap = "nowrap",
  gap = 0,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex",
        `flex-${direction}`,
        `justify-${justify}`,
        `item-${item}`,
        `flex-${wrap}`,
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
};
