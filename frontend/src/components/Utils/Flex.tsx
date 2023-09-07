import classNames from "classnames";
import { ReactNode } from "react";

type FlexProps = {
  className?: string;
  children: ReactNode;
};

export default function Flex({ className, children, ...rest }: FlexProps) {
  return (
    <div className={classNames("flex", className)} {...rest}>
      {children}
    </div>
  );
}
