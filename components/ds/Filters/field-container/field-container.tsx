import { cn } from "src/utils/cn";

import { TFilterFieldContainer } from "./field-container.types";

export function FilterFieldContainer({ children, label, hideLabel }: TFilterFieldContainer.Props) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={cn("font-walsheim text-sm font-medium uppercase text-spaceBlue-200", { hidden: hideLabel })}
        aria-hidden={hideLabel}
      >
        {label}
      </label>
      <div>{children}</div>
    </div>
  );
}
