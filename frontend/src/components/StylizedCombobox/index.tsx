import { Combobox } from "@headlessui/react";
import { useState } from "react";
import classNames from "classnames";
import SearchLine from "src/icons/SearchLine";
import ArrowDownSLine from "src/icons/ArrowDownSLine";

export type Props<T> =
  | {
      options: T[];
      selectedOptions: T[];
      setSelectedOptions: (value: T[]) => void;
      optionFilter: (query: string, option: T) => boolean;
      placeholder: string;
      multiple: true;
    }
  | {
      options: T[];
      selectedOptions: T;
      setSelectedOptions: (value: T) => void;
      optionFilter: (query: string, option: T) => boolean;
      placeholder: string;
      multiple?: false;
    };

export interface Option {
  key: () => string;
  value: () => string;
  displayValue: () => string;
}

export default function StylizedCombobox<T extends Option | { toString: () => string }>({
  options,
  selectedOptions,
  setSelectedOptions,
  optionFilter,
  placeholder,
  multiple,
}: Props<T>) {
  const [query, setQuery] = useState("");

  const filteredOptions = query === "" ? options : options.filter(option => optionFilter(query, option));

  const children = ({ open }: { open: boolean }) => (
    <>
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
            />
          </div>
          <ArrowDownSLine className="text-2xl" />
        </div>
      </Combobox.Button>
      <Combobox.Options className="flex flex-col w-full mt-2 cursor-pointer bg-greyscale-800 border border-greyscale-50/12 backdrop-blur-lg rounded-2xl">
        {filteredOptions.map((option, index, languages) => (
          <Combobox.Option
            key={(option as Option).key ? (option as Option).key() : option.toString()}
            value={(option as Option).value ? (option as Option).value() : option.toString()}
          >
            {({ active }) => (
              <div
                className={classNames(
                  "flex px-4 py-2 font-walsheim text-sm text-greyscale-50",
                  {
                    "border-b border-greyscale-50/8": index < languages.length - 1,
                    "rounded-t-2xl pt-4": index === 0,
                    "rounded-b-2xl pb-4": index === languages.length - 1,
                  },
                  { "bg-greyscale-800": !active, "bg-greyscale-600": active }
                )}
              >
                {(option as Option).displayValue ? (option as Option).displayValue() : option.toString()}
              </div>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </>
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
