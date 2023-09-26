import { PropsWithChildren } from "react";

export function ContributionAttribute({ children }: PropsWithChildren) {
  return <div className="inline-block rounded-full border border-greyscale-50/8 bg-white/2 px-2 py-1">{children}</div>;
}
