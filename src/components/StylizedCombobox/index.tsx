import { Combobox } from "@headlessui/react";
import { PropsWithChildren, useState } from "react";
import { cn } from "src/utils/cn";
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
          className={cn(
            "flex h-8 w-full flex-row items-center justify-between rounded-lg border border-greyscale-50/8 bg-white/5 px-1.5 text-greyscale-400",
            {
              "ring-solid bg-spacePurple-900 text-spacePurple-500 ring-2 ring-spacePurple-500": open,
            }
          )}
        >
          <div className="flex w-full cursor-default flex-row items-center gap-2.5">
            <div className="pt-0.5 text-lg">
              <SearchLine />
            </div>
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              className={cn("w-full border-none bg-transparent text-sm font-normal outline-none")}
              placeholder={open ? "" : placeholder}
              autoComplete="off"
              value={query}
            />
          </div>
          <ArrowDownSLine className="text-2xl" />
        </div>
      </Combobox.Button>
      <Combobox.Options className="mt-2 flex w-full flex-col">
        <div className="cursor-pointer overflow-hidden rounded-2xl border border-greyscale-50/12 bg-greyscale-800">
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
          <ComboboxOption key={option.value} option={option} last={index === options.length - 1}>
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
    className={cn(
      "flex bg-greyscale-800 px-4 py-2 font-walsheim text-sm leading-4 text-greyscale-50 ui-active:bg-greyscale-600",
      {
        "border-b border-greyscale-50/8": !last,
      }
    )}
  >
    {children}
  </Combobox.Option>
);
