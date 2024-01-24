import { TSelectAutocomplete } from "./select-autocomplete.types";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { cn } from "src/utils/cn";
import { Combobox, Transition } from "@headlessui/react";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { SelectAutocompleteHooks as Hooks } from "components/ds/Filters/select-autocomplete/select-autocomplete.hooks";
import { Option } from "./components/option/option";
import { Options } from "components/ds/Filters/select-autocomplete/components/options/options";

export function SelectAutocomplete<T extends TSelectAutocomplete.Item>({
  disabled = false,
  icon,
  items,
  tokens,
  type,
  ...comboProps
}: TSelectAutocomplete.Props<T>) {
  const { selected } = comboProps;
  const token = Hooks.useTokens(selected, items, tokens);
  const { filteredItems, query, setQuery } = Hooks.useFilteredItems(selected, items);
  const selectedItems = Hooks.useSelectedItems(selected);

  const { refs, floatingStyles } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

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
                  {!query?.length ? <span className="font-walsheim text-sm leading-none">{token}</span> : null}
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
                <Options selectedItems={selectedItems} filteredItems={filteredItems} type={type} />
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
    </div>
  );
}
