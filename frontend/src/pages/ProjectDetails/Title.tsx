import { PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
  return <div className="text-2xl font-belwe">{children}</div>;
}
