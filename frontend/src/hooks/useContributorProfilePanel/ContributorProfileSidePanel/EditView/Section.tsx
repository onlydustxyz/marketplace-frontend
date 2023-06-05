import { PropsWithChildren } from "react";

type Props = {
  title: string;
} & PropsWithChildren;

export function Section({ title, children }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-belwe font-normal text-base text-white">{title}</div>
      {children}
    </div>
  );
}
