import { PropsWithChildren } from "react";

export function FilterField({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">{label}</label>
      <div>{children}</div>
    </div>
  );
}
