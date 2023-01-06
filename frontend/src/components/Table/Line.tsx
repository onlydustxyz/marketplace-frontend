import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

const Line: React.FC<Props> = ({ className, children }) => {
  return <tr className={`border-b border-gray-800 ${className}`}>{children}</tr>;
};

export default Line;
