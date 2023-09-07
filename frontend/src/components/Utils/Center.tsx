import classNames from "classnames";
import { ReactNode } from "react";

type CenterProps = {
  className?: string;
  children: ReactNode;
};

export default function Center({ className, children, ...rest }: CenterProps) {
  return (
    <div className={classNames("flex items-center justify-center", className)} {...rest}>
      {children}
    </div>
  );
}
