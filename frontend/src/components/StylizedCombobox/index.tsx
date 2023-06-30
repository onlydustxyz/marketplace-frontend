import { Combobox } from "@headlessui/react";
import { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import SearchLine from "src/icons/SearchLine";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { Virtuoso } from "react-virtuoso";
import { ReactElement } from "react-markdown/lib/react-markdown";

export type Props<T extends Option> = {
  options: T[];
  optionFilter: (query: string, option: T) => boolean;
  placeholder: string;
  maxDisplayedOptions: number;
  testId?: string;
  render?: (props: RenderProps<T>) => ReactElement;
  emptyStateHeight?: number;
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
  id: string;
  value: string;
  displayValue: string;
}

export interface RenderProps<T extends Option> {
  option: T;
}

export const EMPTY_OPTION_ID = "__EMPTY_OPTION_ID__";

export default function StylizedCombobox<T extends Option>({
  options,
  selectedOptions,
  setSelectedOptions,
  optionFilter,
  placeholder,
  multiple,
  maxDisplayedOptions,
  testId,
  render = ({ option }) => <div>{option.displayValue}</div>,
  emptyStateHeight = 0,
}: Props<T>) {
  const [query, setQuery] = useState("");

  const filteredOptions = query === "" ? options : options.filter(option => optionFilter(query, option));

  if (
    query !== "" &&
    ![...filteredOptions, ...[selectedOptions].flat()]
      .map(o => o.displayValue?.toLowerCase())
      .includes(query.toLowerCase())
  ) {
    filteredOptions.push({ id: EMPTY_OPTION_ID, value: query } as T);
  }

  const children = ({ open }: { open: boolean }) => (
    <div>
      <Combobox.Button as="div" data-testid={testId}>
        <div
          className={classNames(
            "flex flex-row items-center justify-between w-full rounded-lg px-1.5 h-8 bg-white/5 border border-greyscale-50/8 text-greyscale-400",
            {
              "bg-spacePurple-900 text-spacePurple-500 ring-solid ring-2 ring-spacePurple-500": open,
            }
          )}
        >
          <div className="flex flex-row items-center w-full cursor-default gap-2.5">
            <div className="pt-0.5 text-lg">
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
        <div className="cursor-pointer bg-greyscale-800 border border-greyscale-50/12 backdrop-blur-lg rounded-2xl overflow-hidden">
          <VirtualizedOptions
            options={filteredOptions}
            lineHeight={32}
            maxDisplayedOptions={maxDisplayedOptions}
            render={render}
            emptyStateHeight={emptyStateHeight}
          />
        </div>
      </Combobox.Options>
    </div>
  );

  return multiple ? (
    <Combobox
      value={selectedOptions}
      onChange={value => {
        setQuery("");
        setSelectedOptions(value);
      }}
      multiple
    >
      {children}
    </Combobox>
  ) : (
    <Combobox
      value={selectedOptions}
      onChange={value => {
        setQuery("");
        setSelectedOptions(value);
      }}
    >
      {children}
    </Combobox>
  );
}

function VirtualizedOptions<T extends Option>({
  options,
  lineHeight,
  maxDisplayedOptions,
  render,
  emptyStateHeight,
}: {
  options: T[];
  lineHeight: number;
  emptyStateHeight: number;
  maxDisplayedOptions: number;
  render: (props: RenderProps<T>) => ReactElement;
}) {
  return (
    <Virtuoso
      style={{
        height:
          /* N-1 lines have a height of lineHeight+1 because of the border-bottom */
          Math.min(options.length - 1, maxDisplayedOptions - 1) * (lineHeight + 1) +
          /* Last line has a height of lineHeight */
          lineHeight +
          /* add extra height if custom empty state render */
          (options.some(o => o.id === EMPTY_OPTION_ID) ? emptyStateHeight : 0),
      }}
      data={options}
      itemContent={(index, option) => {
        return (
          <ComboboxOption
            key={(option as Option).value ? (option as Option).value : option.toString()}
            option={option as Option}
            last={index === options.length - 1}
          >
            {render({ option })}
          </ComboboxOption>
        );
      }}
    />
  );
}

type ComboboxOptionProps = {
  option: Option;
  last?: boolean;
} & PropsWithChildren;

const ComboboxOption = ({ option, last, children }: ComboboxOptionProps) => (
  <Combobox.Option
    value={option}
    className={classNames(
      "flex px-4 py-2 font-walsheim text-sm leading-4 text-greyscale-50 bg-greyscale-800 ui-active:bg-greyscale-600",
      {
        "border-b border-greyscale-50/8": !last,
      }
    )}
  >
    {children}
  </Combobox.Option>
);
