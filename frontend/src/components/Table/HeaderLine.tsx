import { PropsWithChildren } from "react";
import classNames from "classnames";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function HeaderLine({ className, children }: Props) {
  return <tr className={classNames("uppercase", className)}>{children}</tr>;
}
