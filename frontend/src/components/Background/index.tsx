import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum BackgroundRoundedBorders {
  Full = "rounded-3xl",
  Right = "rounded-r-3xl",
}

type Props = {
  roundedBorders: BackgroundRoundedBorders;
  withSidebar?: boolean;
} & PropsWithChildren;

export default function Background({ roundedBorders, withSidebar = false, children }: Props) {
  return (
    <div
      className={classNames("overflow-y-auto scrollbar-none h-full w-full mb-6", {
        "mr-6 ml-2": withSidebar,
        "mx-6 pr-6": !withSidebar,
      })}
    >
      <div
        className={classNames("bg-space bg-no-repeat bg-fixed bg-clip-content min-h-full", roundedBorders, {
          "mr-6": !withSidebar,
        })}
      >
        {children}
      </div>
    </div>
  );
}
