import { PropsWithChildren } from "react";

export function Label({ children }: PropsWithChildren) {
  return <label className={"font-walsheim text-sm font-medium uppercase text-greyscale-300"}>{children}</label>;
}
