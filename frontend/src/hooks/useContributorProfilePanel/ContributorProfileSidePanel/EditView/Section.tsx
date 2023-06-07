import { PropsWithChildren } from "react";

type Props = {
  title: string;
  subtitle?: string;
} & PropsWithChildren;

export function Section({ title, subtitle, children }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div className="font-belwe font-normal text-base text-white">{title}</div>
        {subtitle && <div className="font-walsheim font-normal text-sm text-greyscale-300">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}
