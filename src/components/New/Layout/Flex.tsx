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

enum Justify {
  normal = "justify-normal",
  start = "justify-start",
  end = "justify-end",
  center = "justify-center",
  between = "justify-between",
  around = "justify-around",
}

enum Item {
  start = "items-start",
  end = "items-end",
  center = "items-center",
}

enum Wrap {
  nowrap = "flex-nowrap",
  wrap = "flex-wrap",
  "wrap-reverse" = "flex-wrap-reverse",
}

enum Direction {
  row = "flex-row",
  col = "flex-col",
  "row-reverse" = "flex-row-reverse",
  "col-reverse" = "col-row-reverse",
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
      className={cn("flex", Direction[direction], Justify[justify], Item[item], Wrap[wrap], `gap-${gap}`, className)}
    >
      {children}
    </div>
  );
};
