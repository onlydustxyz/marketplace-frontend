import { ScrollViewProps } from "./scroll-view.type.ts";
import { ForwardedRef, forwardRef } from "react";
import { cn } from "../../../../src/utils/cn.ts";

export const ScrollView = forwardRef(function Background(
  { className, children }: ScrollViewProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div className="flex h-[calc(100dvh)] w-screen flex-col xl:fixed">
      <div
        ref={ref}
        className={cn(
          "h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
});

export default ScrollView;
