import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum CellHeight {
  Small = "Small",
  Medium = "Medium",
  Tall = "Tall",
}

interface CellProps extends PropsWithChildren {
  height?: CellHeight;
  horizontalMargin?: boolean;
  className?: string;
}

export const Cell: React.FC<CellProps> = ({
  height = CellHeight.Tall,
  horizontalMargin = true,
  className,
  children,
}) => {
  return (
    <td>
      <div
        className={classNames(`flex items-center text-greyscale-50 font-normal ${className}`, {
          "py-4": height === CellHeight.Tall,
          "py-3": height === CellHeight.Medium,
          "py-px": height === CellHeight.Small,
          "px-3": horizontalMargin,
        })}
      >
        {children}
      </div>
    </td>
  );
};

export default Cell;
