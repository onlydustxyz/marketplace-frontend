import { TFilterFieldContainer } from "./field-container.types";

export function FilterFieldContainer({ children, label }: TFilterFieldContainer.Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">{label}</label>
      <div>{children}</div>
    </div>
  );
}
