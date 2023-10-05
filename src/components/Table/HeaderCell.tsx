import { PropsWithChildren } from "react";
import { cn } from "src/utils/cn";

export enum HeaderCellWidth {
  Sixth = "w-1/6",
  Fifth = "w-1/5",
  Quarter = "w-1/4",
  Third = "w-1/3",
  Half = "w-1/2",
}

type Props = PropsWithChildren<{
  onClick?: () => void;
  horizontalMargin?: boolean;
  width?: HeaderCellWidth;
  className?: string;
}>;

export default function HeaderCell({ onClick, children, horizontalMargin, width, className }: Props) {
  return (
    <th
      scope="col"
      className={cn(
        "h-full text-left",
        {
          "px-3": horizontalMargin,
          "cursor-pointer": onClick,
        },
        width
      )}
      onClick={onClick}
    >
      <div className={cn("mb-2 flex h-4 items-center gap-1 font-medium", className)}>{children}</div>
    </th>
  );
}
