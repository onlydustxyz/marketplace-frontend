import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { cn } from "src/utils/cn";

import { TSelectAutocomplete } from "../../select-autocomplete.types";
import { TButton } from "./button.types";

export function Button<T extends TSelectAutocomplete.Item>({ icon, query, token, selected, open }: TButton.Props<T>) {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex w-full items-center justify-between px-2.5 py-1.5">
      <span className="flex flex-1 items-center gap-2">
        {icon?.({
          selected,
          className: cn("text-base leading-none", { "text-spacePurple-500": open }),
        })}
        {!query?.length ? <span className="font-walsheim text-sm leading-none">{token}</span> : null}
      </span>
      <ArrowDownSLine
        className={cn("text-xl leading-none text-spaceBlue-200", {
          "text-spacePurple-400": open,
        })}
      />
    </div>
  );
}
