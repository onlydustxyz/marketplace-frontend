import classNames from "classnames";
import { PropsWithChildren, ReactElement, ReactNode } from "react";

type Props = {
  title: ReactElement | string;
  subtitle?: ReactNode;
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
        <div className="font-belwe text-base font-normal text-white">{title}</div>
        {subtitle && <div className="font-walsheim text-xs font-normal text-greyscale-300">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}
