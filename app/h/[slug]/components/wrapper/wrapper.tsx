import { cn } from "src/utils/cn";

import { TWrapper } from "./wrapper.types";

export function Wrapper({ children, className }: TWrapper.Props) {
  return <div className={cn("flex w-full flex-1 flex-col px-6 md:px-16 xl:px-28", className)}>{children}</div>;
}
