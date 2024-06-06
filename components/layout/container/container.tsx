import { PropsWithChildren } from "react";

import { cn } from "src/utils/cn";

export function Container({ children, hasPadding = true }: PropsWithChildren<{ hasPadding?: boolean }>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl", {
        "px-6": hasPadding,
      })}
    >
      {children}
    </div>
  );
}
