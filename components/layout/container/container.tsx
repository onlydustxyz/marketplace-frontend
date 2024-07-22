import { PropsWithChildren } from "react";

import { cn } from "src/utils/cn";

export function Container({ children, className }: PropsWithChildren & { className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1664px] px-2 sm:px-6", className)}>{children}</div>;
}
