import { cn } from "src/utils/cn";

import { TContainer } from "components/layout/container/container.types";

export function Container({ children, className, size = "regular" }: TContainer.Props) {
  if (size === "regular") {
    return <div className={cn("mx-auto w-full max-w-7xl px-2 sm:px-6", className)}>{children}</div>;
  }

  return <div className={cn("mx-auto w-full max-w-[1664px] px-2 sm:px-6", className)}>{children}</div>;
}
