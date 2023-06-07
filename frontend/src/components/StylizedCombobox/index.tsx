import { Combobox } from "@headlessui/react";
import { useState } from "react";
import classNames from "classnames";
import SearchLine from "src/icons/SearchLine";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { Virtuoso } from "react-virtuoso";

export type Props<T> = {
  options: T[];
  optionFilter: (query: string, option: T) => boolean;
  placeholder: string;
  maxDisplayedOptions: number;
} & (
  | {
      selectedOptions: T[];
      setSelectedOptions: (value: T[]) => void;
      multiple: true;
    }
  | {
      selectedOptions: T;
      setSelectedOptions: (value: T) => void;
      multiple?: false;
    }
);

export interface Option {
  value: string;
  displayValue: string;
}

export default function StylizedCombobox<T extends Option | { toString: () => string }>({
  options,
  selectedOptions,
  setSelectedOptions,
  optionFilter,
  placeholder,
  multiple,
  maxDisplayedOptions,
}: Props<T>) {
  const [query, setQuery] = useState("");

  const filteredOptions = query === "" ? options : options.filter(option => optionFilter(query, option));

  const children = ({ open }: { open: boolean }) => (
    <div>
      <Combobox.Button as="div">
        <div
          className={classNames(
            "flex flex-row items-center justify-between w-full rounded-lg px-1.5 h-9 bg-white/5 border border-greyscale-50/8 text-greyscale-400",
            {
              "bg-spacePurple-900 text-spacePurple-500 ring-solid ring-2 ring-spacePurple-500": open,
            }
          )}
        >
          <div className="flex flex-row items-center w-full cursor-default gap-2.5">
            <div className="pt-1 text-lg">
              <SearchLine />
            </div>
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              className={classNames("border-none outline-none w-full bg-transparent font-normal text-sm")}
              placeholder={open ? "" : placeholder}
              autoComplete="off"
              value={query}
            />
          </div>
          <ArrowDownSLine className="text-2xl" />
        </div>
      </Combobox.Button>
      <Combobox.Options className="flex flex-col w-full mt-2">
        {filteredOptions.length > 0 ? (
          <div className="cursor-pointer bg-greyscale-800 border border-greyscale-50/12 backdrop-blur-lg rounded-2xl overflow-hidden">
            <VirtualizedOptions options={filteredOptions} lineHeight={32} maxDisplayedOptions={maxDisplayedOptions} />
          </div>
        ) : (
          <div />
        )}
      </Combobox.Options>
    </div>
  );

  return multiple ? (
    <Combobox value={selectedOptions} onChange={value => setSelectedOptions(value)} multiple>
      {children}
    </Combobox>
  ) : (
    <Combobox value={selectedOptions} onChange={value => setSelectedOptions(value)}>
      {children}
    </Combobox>
  );
}

function VirtualizedOptions<T extends Option | { toString: () => string }>({
  options,
  lineHeight,
  maxDisplayedOptions,
}: {
  options: T[];
  lineHeight: number;
  maxDisplayedOptions: number;
}) {
  return (
    <Virtuoso
      style={{
        height:
          /* N-1 lines have a height of lineHeight+1 because of the border-bottom */
          Math.min(options.length - 1, maxDisplayedOptions - 1) * (lineHeight + 1) +
          /* Last line has a height of lineHeight */
          lineHeight +
          /* Adds additional height due to first & last lines additional padding */
          (options.length < maxDisplayedOptions ? 16 : 8),
      }}
      data={options}
      itemContent={(index, option) => {
        return (
          <Combobox.Option
            key={(option as Option).value ? (option as Option).value : option.toString()}
            value={option}
            className={classNames(
              "flex px-4 py-2 font-walsheim text-sm leading-4 text-greyscale-50 bg-greyscale-800 ui-active:bg-greyscale-600",
              {
                "border-b border-greyscale-50/8": index < options.length - 1,
              }
            )}
          >
            {(option as Option).displayValue ? (option as Option).displayValue : option.toString()}
          </Combobox.Option>
        );
      }}
    />
  );
}
