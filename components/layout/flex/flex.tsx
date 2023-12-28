import { FC, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";
import { tv } from "tailwind-variants";
import { AlignContent, AlignItems, Direction, JustifyContent, Wrap } from "./flex.type";

interface FlexProps extends PropsWithChildren {
  direction?: Direction;
  wrap?: Wrap;
  justifyContent?: JustifyContent;
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const flexVariants = tv({
  base: "flex",
  variants: {
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      col: "flex-col",
      "col-reverse": "flex-col-reverse",
    },
    wrap: {
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
      nowrap: "flex-nowrap",
    },
    justifyContent: {
      normal: "justify-normal",
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
      stretch: "justify-stretch",
    },
    alignContent: {
      normal: "content-normal",
      center: "content-center",
      start: "content-start",
      end: "content-end",
      between: "content-between",
      around: "content-around",
      evenly: "content-evenly",
      baseline: "content-baseline",
      stretch: "content-stretch",
    },
    alignItems: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
  },
});

export const Flex: FC<FlexProps> = ({
  direction,
  wrap,
  justifyContent,
  alignContent,
  alignItems,
  className,
  as: Component = "div",
  children,
}) => {
  return (
    <Component
      className={cn(
        flexVariants({
          direction,
          wrap,
          justifyContent,
          alignContent,
          alignItems,
        }),
        className
      )}
    >
      {children}
    </Component>
  );
};
