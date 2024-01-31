import { ForwardedRef, forwardRef } from "react";

import { cn } from "src/utils/cn";

import { TScrollView } from "./scroll-view.types";

export const ScrollView = forwardRef(function Background(
  { className, children }: TScrollView.Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={cn("scrollbar-sm h-full w-full overflow-y-auto", className)}>
      {children}
    </div>
  );
});
