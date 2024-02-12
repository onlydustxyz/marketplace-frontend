import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

import { cn } from "src/utils/cn";

export enum BackgroundRoundedBorders {
  Full = "lg:rounded-3xl",
  Right = "lg:rounded-r-3xl",
}

type Props = {
  roundedBorders: BackgroundRoundedBorders;
  className?: string;
  innerClassName?: string;
} & PropsWithChildren;

const Background = forwardRef(function Background(
  { roundedBorders, children, className, innerClassName }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5",
        roundedBorders,
        className
      )}
    >
      <div className={cn("h-full", innerClassName)}>{children}</div>
    </div>
  );
});

export default Background;
