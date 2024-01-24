import { Combobox, Transition } from "@headlessui/react";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { useIntl } from "src/hooks/useIntl.tsx";
import ArrowDownSLine from "src/icons/ArrowDownSLine.tsx";
import { cn } from "src/utils/cn.ts";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { isArray } from "lodash";
import FilterSelectAutoCompleteItem from "src/components/New/Filter/FilterSelectedAutoComplete/components/item.tsx";

export type Item = {
  id: number | string;
  label?: string | JSX.Element;
  value?: string;
  image?: string | null;
};

type Props<T> = {
  disabled?: boolean;
  icon?: ({ selected, className }: { selected: T | T[]; className: string }) => ReactElement;
  items: T[];
  tokens: Record<"zero" | "other", string>;
  type: "project" | "user";
};

type SingleProps<T> = Props<T> & {
  multiple?: never;
  onChange?: (value: T) => void;
  selected: T;
};

type MultipleProps<T> = Props<T> & {
  multiple?: true;
  onChange?: (value: T[]) => void;
  selected: T[];
};

export function FilterSelectAutoComplete<T extends Item>({
  disabled = false,
  icon,
  items,
  tokens,
  type,
  ...comboProps
}: SingleProps<T> | MultipleProps<T>) {
  const { T } = useIntl();
  const [query, setQuery] = useState<string>();
  const { selected } = comboProps;

  const { refs, floatingStyles, placement } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  const renderToken = useCallback(() => {
    if (Array.isArray(selected)) {
      // Sometimes we have more items selected than items available in the list.
      // We need to filter to avoid showing "2 x selected" when there's only 1 item in the list for example.
      const filteredSelected = selected.filter(({ id }) => items.map(({ id }) => id).includes(id));

      return filteredSelected.length ? T(tokens.other, { count: filteredSelected.length }) : T(tokens.zero);
    }

    return selected?.label ?? T(tokens.zero);
  }, [selected, items, tokens, T]);

  const isItemSelected = (item: T) => {
    if (isArray(selected)) {
      return selected?.find(({ id }) => id === item.id);
    }

    return selected?.id === item.id;
  };

  const filteredItems = useMemo(() => {
    items.filter(item =>
      query?.length ? item.label?.toString()?.toLowerCase()?.includes(query?.toLowerCase()) : true
    );

    if (isArray(selected)) {
      return items.filter(item => !isItemSelected(item));
    }

    return items;
  }, [items, query, selected]);

  const selectedItems = useMemo(() => {
    if (isArray(selected)) {
      return selected;
    }

    return [selected];
  }, [selected]);

  return (
    <div className={cn("relative", { "opacity-50": disabled })}>
      {/* // need this to handle the multiple and single from headless ui
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore*/}
      <Combobox {...comboProps} disabled={disabled} by="id">
        {({ open }) => (
          <>
            <Combobox.Button
              ref={refs.setReference}
              as="div"
              className={cn(
                "relative flex w-full items-center gap-6 rounded-lg border border-card-border-light bg-card-background-medium px-2.5 py-1.5 text-greyscale-50 shadow-light",
                {
                  "z-20 border-spacePurple-400 bg-spacePurple-900 text-spacePurple-400 outline-double outline-1 outline-spacePurple-400":
                    open,
                }
              )}
            >
              <Combobox.Input
                className={cn(
                  "peer w-full border-none bg-transparent pl-6 font-walsheim text-sm text-greyscale-50 outline-none",
                  {
                    "placeholder:text-greyscale-50 focus-within:placeholder:text-spacePurple-400": !open,
                    "placeholder:text-spacePurple-400": open,
                  }
                )}
                onChange={event => {
                  setQuery(event.target.value);
                }}
                autoComplete="off"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 flex w-full items-center justify-between px-2.5 py-1.5">
                <span className="flex flex-1 items-center gap-2">
                  {icon?.({
                    selected,
                    className: cn("text-base leading-none", { "text-spacePurple-500": open }),
                  })}
                  {!query?.length ? <span className="font-walsheim text-sm leading-none">{renderToken()}</span> : null}
                </span>
                <ArrowDownSLine
                  className={cn("text-xl leading-none text-spaceBlue-200", {
                    "text-spacePurple-400": open,
                  })}
                />
              </div>
            </Combobox.Button>
            <Transition
              ref={refs.setFloating}
              style={{ ...floatingStyles, top: "-12px" }}
              enter="transform transition duration-100 ease-out"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transform transition duration-75 ease-out"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
              afterLeave={() => setQuery("")}
              className={cn(
                "absolute -left-1.5 -right-1.5 z-10 w-[calc(100%_+_24px)] overflow-hidden rounded-2xl border border-card-border-light bg-card-background-medium shadow-medium"
              )}
            >
              <Combobox.Options className="bg-greyscale-800 p-1 py-2 pt-[54px]">
                <div className="max-h-60 divide-y divide-card-border-light overflow-auto px-2 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
                  {selectedItems.length ? (
                    <div className="flex flex-col gap-2 pb-2">
                      {selectedItems.map(item => (
                        <Combobox.Option key={item.id} value={item}>
                          {({ active }) => (
                            <FilterSelectAutoCompleteItem selected={true} active={active} type={type} item={item} />
                          )}
                        </Combobox.Option>
                      ))}
                    </div>
                  ) : null}
                  <div className="pt-2">
                    {filteredItems.map(item => (
                      <Combobox.Option key={item.id} value={item}>
                        {({ active, selected }) => (
                          <FilterSelectAutoCompleteItem selected={selected} active={active} type={type} item={item} />
                        )}
                      </Combobox.Option>
                    ))}
                  </div>
                </div>
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
    </div>
  );
}
