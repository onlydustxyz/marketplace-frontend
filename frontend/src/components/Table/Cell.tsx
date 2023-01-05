import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Cell: React.FC<Props> = ({ className, children }) => {
  return <td className={`px-6 py-4 text-lg ${className}`}>{children}</td>;
};

export default Cell;
