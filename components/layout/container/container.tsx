import { cn } from "src/utils/cn";

import { TContainer } from "components/layout/container/container.types";

export function Container({ children, className }: TContainer.Props) {
  return <div className={cn("mx-auto w-full max-w-[1664px] px-2 sm:px-6", className)}>{children}</div>;
}
