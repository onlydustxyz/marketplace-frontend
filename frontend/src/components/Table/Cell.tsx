import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Cell: React.FC<Props> = ({ className, children }) => {
  return (
    <td>
      <div className={`flex items-center px-3 my-4 ${className}`}>{children}</div>
    </td>
  );
};

export default Cell;
