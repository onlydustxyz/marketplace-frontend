import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-7xl px-2 sm:px-6">{children}</div>;
}
