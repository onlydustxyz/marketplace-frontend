import { PropsWithChildren } from "react";
import { cn } from "src/utils/cn";

type ChipsProps = {
  className?: string;
  number: number | null;
  children: React.ReactElement[];
};

export function Chips({ children, number }: ChipsProps) {
  return <div className="flex">{children.map((child, key) => (number && key >= number ? <></> : child))}</div>;
}
