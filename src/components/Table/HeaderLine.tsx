import { PropsWithChildren } from "react";
import { cn } from "src/utils/cn";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function HeaderLine({ className, children }: Props) {
  return <tr className={cn("uppercase", className)}>{children}</tr>;
}
