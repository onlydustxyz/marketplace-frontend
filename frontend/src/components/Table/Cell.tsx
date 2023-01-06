import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Cell: React.FC<Props> = ({ className, children }) => {
  return (
    <td>
      <div className={`h-10 flex items-center space-x-1 px-6 py-4 text-lg ${className}`}>{children}</div>
    </td>
  );
};

export default Cell;
