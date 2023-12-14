import { PropsWithChildren } from "react";
import { cn } from "src/utils/cn";

type TitleProps = {
  className?: string;
} & PropsWithChildren;

export default function Title({ children, className }: TitleProps) {
  return <div className={cn("font-belwe text-3xl xl:text-2xl", className)}>{children}</div>;
}
