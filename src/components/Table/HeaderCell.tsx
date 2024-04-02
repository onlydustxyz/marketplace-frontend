import { PropsWithChildren } from "react";

import { cn } from "src/utils/cn";

export enum HeaderCellWidth {
  Eighth = "w-[12%]",
  Sixth = "w-1/6",
  Fifth = "w-1/5",
  Quarter = "w-1/4",
  Third = "w-1/3",
  Half = "w-1/2",
  Full = "w-full",
}

type Props = PropsWithChildren<{
  onClick?: () => void;
  horizontalMargin?: boolean;
  width?: HeaderCellWidth;
  className?: string;
  thClassName?: string;
}>;

export default function HeaderCell({ onClick, children, horizontalMargin, width, className, thClassName }: Props) {
  return (
    <th
      scope="col"
      className={cn(
        "h-full text-left",
        {
          "px-3": horizontalMargin,
          "cursor-pointer": onClick,
        },
        width,
        thClassName
      )}
      onClick={onClick}
    >
      <div className={cn("mb-2 flex h-4 items-center gap-1 font-medium", className)}>{children}</div>
    </th>
  );
}
