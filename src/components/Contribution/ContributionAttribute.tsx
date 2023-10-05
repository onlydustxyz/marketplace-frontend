import { cn } from "src/utils/cn";
import { PropsWithChildren } from "react";

export function ContributionAttribute({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("inline-block rounded-full border border-greyscale-50/8 bg-white/2 px-2 py-1", className)}>
      {children}
    </div>
  );
}
