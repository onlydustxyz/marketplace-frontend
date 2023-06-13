import classNames from "classnames";
import { PropsWithChildren, ReactElement } from "react";

type Props = {
  title: ReactElement | string;
  subtitle?: string;
  gap?: "narrow" | "wide";
} & PropsWithChildren;

export function Section({ title, subtitle, gap = "wide", children }: Props) {
  return (
    <div
      className={classNames("flex flex-col", {
        "gap-2": gap === "narrow",
        "gap-4": gap === "wide",
      })}
    >
      <div className="flex flex-col gap-1">
        <div className="font-belwe font-normal text-base text-white">{title}</div>
        {subtitle && <div className="font-walsheim font-normal text-sm text-greyscale-300">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}
