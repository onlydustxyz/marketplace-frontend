import { ForwardedRef, forwardRef } from "react";

import { cn } from "src/utils/cn";

import { TBackground } from "components/layout/background/background.types";

export const Background = forwardRef(function Background(
  { children, className }: TBackground.Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={cn("scrollbar-sm h-full w-full overflow-y-auto bg-space bg-no-repeat", className)}>
      {children}
    </div>
  );
});
Background.displayName = "Background";
