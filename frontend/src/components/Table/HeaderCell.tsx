import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum HeaderCellWidth {
  Sixth = "w-1/6",
  Quarter = "w-1/4",
  Half = "w-1/2",
}

interface Props extends PropsWithChildren {
  onClick?: () => void;
  horizontalMargin?: boolean;
  width?: HeaderCellWidth;
}

export const HeaderCell: React.FC<Props> = ({ onClick, children, horizontalMargin, width }) => {
  return (
    <th
      scope="col"
      className={classNames("text-left h-full", {
        "px-3": horizontalMargin,
        [`${width}`]: width,
        "hover:cursor-pointer": onClick,
      })}
      onClick={onClick}
    >
      <div className="h-4 mb-2 flex items-center space-x-1 font-medium">{children}</div>
    </th>
  );
};

export default HeaderCell;
