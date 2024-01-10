import { Listbox, Transition } from "@headlessui/react";
import Arrow from "../../../src/assets/icons/Arrow.tsx";
import ArrowDownSLine from "../../../src/icons/ArrowDownSLine.tsx";
import CheckLine from "../../../src/icons/CheckLine.tsx";
import { useMemo } from "react";
import { cn } from "src/utils/cn.ts";
import { TSort } from "./sort.types.ts";

export function Sort({ value, onChange, label, options }: TSort.Props) {
  const selected = useMemo(() => options.find(o => o.id === value), [value, options]);
  function handleSortChange(newValue: string) {
    onChange(newValue);
  }

  return (
    <Listbox
      value={value}
      onChange={handleSortChange}
      as="div"
      className="relative h-fit w-fit font-walsheim text-sm font-medium text-greyscale-50"
    >
      {({ open }) => (
        <>
          <Listbox.Button
            className={cn(
              "flex flex-row items-center gap-2 rounded-md border border-greyscale-50/12 bg-whiteFakeOpacity-5 py-1.5 pl-4 pr-2 shadow-heavy",
              {
                "rounded-b-none border-b-transparent": open,
              }
            )}
          >
            <Arrow />
            <div className="flex flex-row items-center gap-1">
              <span>{label}</span>
              <span className="text-spacePurple-500">{selected?.label?.toLowerCase()}</span>
            </div>
            <ArrowDownSLine className="text-xl ui-open:rotate-180" />
          </Listbox.Button>
          <div className="absolute right-0 top-full z-20 w-full">
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="w-full cursor-pointer flex-col divide-y divide-greyscale-50/12 border border-greyscale-50/12 bg-white/2 bg-whiteFakeOpacity-5">
                {options.map(option => (
                  <Listbox.Option
                    key={option.id}
                    value={option.id}
                    className="flex flex-row items-center justify-between px-4 py-3 hover:bg-white/5"
                  >
                    <span>{option.label}</span>
                    <CheckLine className="-my-1 hidden text-xl ui-selected:block" />
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
