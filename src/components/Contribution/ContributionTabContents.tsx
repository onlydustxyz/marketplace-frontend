import { PropsWithChildren } from "react";

export function ContributionTabContents({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2 md:gap-1.5">{children}</div>;
}
