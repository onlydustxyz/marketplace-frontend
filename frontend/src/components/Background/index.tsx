import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum BackgroundRoundedBorders {
  Full = "rounded-3xl",
  Right = "rounded-r-3xl",
}

type Props = {
  roundedBorders: BackgroundRoundedBorders;
} & PropsWithChildren;

export default function Background({ roundedBorders, children }: Props) {
  return <div className={classNames("bg-space bg-no-repeat bg-fixed h-full w-full", roundedBorders)}>{children}</div>;
}
