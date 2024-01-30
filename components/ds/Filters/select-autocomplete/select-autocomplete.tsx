import { TSelectAutocomplete } from "./select-autocomplete.types";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { cn } from "src/utils/cn";
import { Combobox, Transition } from "@headlessui/react";
import { SelectAutocompleteHooks as Hooks } from "./select-autocomplete.hooks";
import { Options } from "./components/options/options";
import { Button } from "./components/button/button";
import { ChangeEvent, useMemo, useRef } from "react";

export function SelectAutocomplete<T extends TSelectAutocomplete.Item>({
  disabled = false,
  icon,
  items,
  tokens,
  type,
  onNextPage,
  loadingNextPage,
  controlledSearch,
  ...comboProps
}: TSelectAutocomplete.Props<T>) {
  const selectedRef = useRef(comboProps.selected);
  const { current: selected } = selectedRef;
  const { selected: selectedTracked } = comboProps;
  const token = Hooks.useTokens(selectedTracked, items, tokens);
  const { filteredItems, query, setQuery } = Hooks.useFilteredItems(selected, items);
  const selectedItems = Hooks.useSelectedItems(selected);

  const { refs, floatingStyles } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (controlledSearch) {
      controlledSearch.onChange(event.target.value);
    }
    setQuery(event.target.value);
  };

  const onButtonFocus = () => {
    selectedRef.current = comboProps.selected;
  };

  const isControlledItems = useMemo(() => {
    if (controlledSearch) {
      return items;
    }

    return filteredItems;
  }, [filteredItems, items, controlledSearch]);

  return (
    <div className={cn("relative", { "opacity-50": disabled })}>
      {/* // need this to handle the multiple and single from headless ui
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore*/}
      <Combobox {...comboProps} disabled={disabled} by="id" value={comboProps.selected}>
        {({ open }) => (
          <>
            <Combobox.Button
              ref={refs.setReference}
              as="div"
              onClick={onButtonFocus}
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
                onChange={onInputChange}
                autoComplete="off"
              />
              <Button selected={selectedTracked} icon={icon} query={query} token={token} open={open} />
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
              afterLeave={() => {
                if (controlledSearch) {
                  controlledSearch.onChange("");
                }
                setQuery("");
              }}
              className={cn(
                "absolute -left-1.5 -right-1.5 z-10 w-[calc(100%_+_24px)] overflow-hidden rounded-2xl border border-card-border-light bg-card-background-medium shadow-medium"
              )}
            >
              <Combobox.Options className="bg-greyscale-800 p-1 py-2 pt-[54px]">
                <Options
                  selectedItems={selectedItems}
                  filteredItems={isControlledItems}
                  type={type}
                  emptyMessage={tokens.empty}
                  onNextPage={onNextPage}
                  loadingNextPage={loadingNextPage}
                />
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
    </div>
  );
}
