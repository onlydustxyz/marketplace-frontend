import { PropsWithChildren } from "react";

export default function List({ children }: PropsWithChildren) {
  return <ul className="mb-4 mt-4 list-disc pl-4">{children}</ul>;
}
