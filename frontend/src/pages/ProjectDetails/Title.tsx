import { PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
  return <div className="font-belwe text-3xl xl:text-2xl">{children}</div>;
}
