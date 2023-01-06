import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Headers: React.FC<Props> = ({ className, children }) => {
  return <tr className={`uppercase ${className}`}>{children}</tr>;
};

export default Headers;
