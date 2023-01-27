import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum CellHeight {
  Small = "Small",
  Tall = "Tall",
}

interface CellProps extends PropsWithChildren {
  height?: CellHeight;
  className?: string;
}

export const Cell: React.FC<CellProps> = ({ height = CellHeight.Tall, className, children }) => {
  return (
    <td>
      <div
        className={classNames(`flex items-center px-3 ${className}`, {
          "py-4": height === CellHeight.Tall,
          "py-1": height === CellHeight.Small,
        })}
      >
        {children}
      </div>
    </td>
  );
};

export default Cell;
