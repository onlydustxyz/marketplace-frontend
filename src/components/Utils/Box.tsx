import { ReactNode } from "react";

type BoxProps = {
  className?: string;
  children: ReactNode;
};

export default function Box({ children, ...rest }: BoxProps) {
  return <div {...rest}>{children}</div>;
}
