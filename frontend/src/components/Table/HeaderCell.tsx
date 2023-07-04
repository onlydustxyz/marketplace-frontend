import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum HeaderCellWidth {
  Sixth = "w-1/6",
  Fifth = "w-1/5",
  Quarter = "w-1/4",
  Third = "w-1/3",
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
      className={classNames("h-full text-left", {
        "px-3": horizontalMargin,
        [`${width}`]: width,
        "hover:cursor-pointer": onClick,
      })}
      onClick={onClick}
    >
      <div className="mb-2 flex h-4 items-center gap-1 font-medium">{children}</div>
    </th>
  );
};

export default HeaderCell;
