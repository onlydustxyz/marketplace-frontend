import { Combobox, Transition } from "@headlessui/react";
import { debounce } from "lodash";
import { useState } from "react";

import { Spinner } from "src/components/Spinner/Spinner";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CheckLine from "src/icons/CheckLine";
import { cn } from "src/utils/cn";

import { useIntl } from "hooks/translate/use-translate";

export function FilterCombobox<T>({
  items,
  selected,
  onChange,
  queryState,
  disabled,
  renderIcon,
  renderItem,
  uniqueKey,
  placeholder,
  isLoading,
}: {
  items: T[];
  selected: T[];
  onChange: (value: T[]) => void;
  queryState: ReturnType<typeof useState<string>>;
  disabled?: boolean;
  renderIcon: (props: { className: string; "aria-hidden": string }) => JSX.Element;
  renderItem: (args: { item: T; selected: boolean; active: boolean }) => JSX.Element;
  uniqueKey: keyof T;
  placeholder?: string;
  isLoading?: boolean;
}) {
  const { T } = useIntl();

  const [query, setQuery] = queryState;

  const handleQueryChange = debounce((query: string) => {
    setQuery(query);
  }, 500);

  function renderOptions() {
    if (isLoading) {
      return (
        <div className="flex justify-center px-4 py-2">
          <Spinner />
        </div>
      );
    }

    if (items.length === 0 && query !== "") {
      return (
        <div className="relative cursor-default select-none px-4 py-2 text-center font-walsheim text-sm text-greyscale-50">
          {T("filter.empty")}
        </div>
      );
    }

    return items.map(item => (
      <Combobox.Option
        key={item[uniqueKey]?.toString()}
        className={({ active }) =>
          cn("relative flex cursor-pointer select-none items-center justify-between px-4 py-1", {
            "bg-card-background-heavy": active,
          })
        }
        value={item}
      >
        {({ selected, active }) => (
          <>
            {renderItem({ item, selected, active })}
            {selected ? <CheckLine className="text-xl leading-none text-greyscale-50" /> : null}
          </>
        )}
      </Combobox.Option>
    ));
  }

  return (
    <Combobox
      value={selected}
      onChange={onChange}
      disabled={disabled}
      multiple
      by={(a, b) => a[uniqueKey] === b[uniqueKey]}
    >
      {({ open }) => (
        <div className="relative isolate z-[1]">
          <Combobox.Button
            as="div"
            className={cn("relative z-30 flex items-center gap-2 overflow-hidden rounded-lg border px-2.5 py-1.5", {
              "border-spacePurple-400 bg-spacePurple-900 ring-1 ring-spacePurple-400": open,
              "border-greyscale-50/8 bg-white/5 focus-within:border-spacePurple-400 focus-within:bg-spacePurple-900 focus-within:ring-1 focus-within:ring-spacePurple-400":
                !open,
            })}
          >
            <Combobox.Input
              className={cn(
                "peer w-full border-none bg-transparent font-walsheim text-sm text-greyscale-50 outline-none",
                {
                  "placeholder:text-greyscale-50 focus-within:placeholder:text-spacePurple-400": !open,
                  "placeholder:text-spacePurple-400": open,
                }
              )}
              placeholder={placeholder}
              onChange={event => handleQueryChange(event.target.value)}
              autoComplete="off"
            />

            {renderIcon({
              "aria-hidden": "true",
              className: cn("order-first leading-none peer-focus-within:text-spacePurple-400", {
                "text-spacePurple-400": open,
                "text-greyscale-50": !open,
              }),
            })}

            <ArrowDownSLine
              className={cn("text-xl leading-none", {
                "text-spacePurple-400": open,
                "text-spaceBlue-200 peer-focus-within:text-spacePurple-400": !open,
              })}
              aria-hidden="true"
            />
          </Combobox.Button>

          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
            className="absolute -left-3 -right-3 -top-3 z-20 flex flex-col gap-2 rounded-xl border border-greyscale-50/12 bg-greyscale-800 p-3 shadow-heavy"
          >
            <div className="h-[34px]" />
            <Combobox.Options className="max-h-48 w-full overflow-auto py-1 text-sm text-greyscale-50 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 focus:outline-none">
              {renderOptions()}
            </Combobox.Options>
          </Transition>
        </div>
      )}
    </Combobox>
  );
}
