import { PropsWithChildren } from "react";

import { cn } from "src/utils/cn";

export function ContributionAttribute({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "inline-block rounded-full border border-card-border-light bg-card-background-light px-2 py-1",
        className
      )}
    >
      {children}
    </div>
  );
}
