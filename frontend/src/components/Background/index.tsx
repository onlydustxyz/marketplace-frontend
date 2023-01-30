import { PropsWithChildren } from "react";

export default function Background({ children }: PropsWithChildren) {
  return <div className="bg-space bg-no-repeat bg-fixed h-full w-full rounded-r-3xl">{children}</div>;
}
