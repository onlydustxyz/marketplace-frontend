import { PropsWithChildren } from "react";

export default function List({ children }: PropsWithChildren) {
  return <ul className="list-disc mt-4 mb-4 pl-4">{children}</ul>;
}
