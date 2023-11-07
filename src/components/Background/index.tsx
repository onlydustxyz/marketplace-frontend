import { cn } from "src/utils/cn";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

export enum BackgroundRoundedBorders {
  Full = "rounded-3xl",
  Right = "rounded-r-3xl",
}

type Props = {
  roundedBorders: BackgroundRoundedBorders;
  className?: string;
} & PropsWithChildren;

const Background = forwardRef(function Background(
  { roundedBorders, children, className }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "h-full w-full overflow-y-auto bg-space bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5",
        roundedBorders,
        className
      )}
    >
      <div>{children}</div>
    </div>
  );
});

export default Background;
