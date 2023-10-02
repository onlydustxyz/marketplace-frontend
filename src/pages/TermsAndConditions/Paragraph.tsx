import { PropsWithChildren } from "react";

export default function Paragraph({ children }: PropsWithChildren) {
  return <p className="pt-3">{children}</p>;
}
