import { PropsWithChildren } from "react";
import classNames from "classnames";

export enum CellHeight {
  Small = "Small",
  Compact = "Compact",
  Medium = "Medium",
  Tall = "Tall",
}

type Props = PropsWithChildren<{
  height?: CellHeight;
  horizontalMargin?: boolean;
  className?: string;
}>;

export default function Cell({ height = CellHeight.Tall, horizontalMargin = true, className, children }: Props) {
  return (
    <td>
      <div
        className={classNames(
          "flex items-center font-normal text-greyscale-50",
          {
            "py-4": height === CellHeight.Tall,
            "py-3": height === CellHeight.Medium,
            "py-1.5": height === CellHeight.Compact,
            "py-px": height === CellHeight.Small,
            "px-3": horizontalMargin,
          },
          className
        )}
      >
        {children}
      </div>
    </td>
  );
}
