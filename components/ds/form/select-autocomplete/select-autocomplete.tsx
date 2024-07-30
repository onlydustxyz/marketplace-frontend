import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Combobox, Transition } from "@headlessui/react";
import { ChangeEvent, useMemo, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { BottomSheet } from "components/ds/modals/bottom-sheet/bottom-sheet";

import { Button } from "./components/button/button";
import { Options } from "./components/options/options";
import { SelectAutocompleteHooks as Hooks } from "./select-autocomplete.hooks";
import { TSelectAutocomplete } from "./select-autocomplete.types";

export function SelectAutocomplete<T extends TSelectAutocomplete.Item>({
  disabled = false,
  icon,
  items,
  tokens,
  type,
  onNextPage,
  loadingNextPage,
  controlledSearch,
  isBlueBackground,
  suggestAction,
  isElevated = true,
  ...comboProps
}: TSelectAutocomplete.Props<T>) {
  const isMd = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.md}px)`);
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
  const floatingTop = floatingStyles.top ? Number(floatingStyles.top) : 0;
  const top = floatingTop >= 0 ? -12 : floatingTop + 46;

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
    <div className={cn({ "opacity-50": disabled })}>
      {/* // need this to handle the multiple and single from headless ui
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore*/}
      <Combobox {...comboProps} disabled={disabled} by="id" value={comboProps.selected}>
        {({ open }) => (
          <div className={cn("relative", { "z-[999]": open })}>
            <Combobox.Button
              ref={refs.setReference}
              as="div"
              onClick={onButtonFocus}
              className={cn(
                "relative flex w-full items-center gap-6 rounded-lg border border-card-border-light bg-card-background-medium px-2.5 py-1.5 text-greyscale-50 shadow-light",
                {
                  "z-20 border-spacePurple-400 bg-spacePurple-900 text-spacePurple-400 outline-double outline-1 outline-spacePurple-400":
                    open,
                  "bg-card-background-base": isBlueBackground,
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
            {!isMd && (
              <Transition
                ref={refs.setFloating}
                style={{
                  ...floatingStyles,
                  top,
                }}
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
                  "absolute -left-1.5 -right-1.5 z-10 w-[calc(100%_+_24px)] overflow-hidden rounded-2xl border border-card-border-light shadow-medium",
                  {
                    "bg-greyscale-800": isElevated,
                    "bg-greyscale-900": !isElevated,
                  }
                )}
              >
                <Combobox.Options
                  className={cn("px-1 py-2", {
                    "pt-14": floatingTop >= 0,
                    "pb-14": floatingTop < 0,
                  })}
                >
                  <div className="max-h-60 divide-y divide-card-border-light overflow-auto px-2 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
                    <Options
                      selectedItems={selectedItems}
                      filteredItems={isControlledItems}
                      type={type}
                      suggestAction={suggestAction}
                      query={query}
                      emptyMessage={tokens.empty}
                      onNextPage={onNextPage}
                      loadingNextPage={loadingNextPage}
                    />
                  </div>
                </Combobox.Options>
              </Transition>
            )}
            {isMd && (
              <BottomSheet onClose={() => null} open={open} hasCloseButton={false} fullScreen={true}>
                <Combobox.Button
                  as="div"
                  className={cn(
                    "relative mt-6 flex w-full items-center gap-6 rounded-lg border border-card-border-light bg-card-background-medium px-2.5 py-1.5 text-greyscale-50 shadow-light",
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

                <Combobox.Options className="h-80 overflow-auto p-1">
                  <Options
                    suggestAction={suggestAction}
                    selectedItems={selectedItems}
                    filteredItems={isControlledItems}
                    type={type}
                    emptyMessage={tokens.empty}
                    query={query}
                    onNextPage={onNextPage}
                    loadingNextPage={loadingNextPage}
                  />
                </Combobox.Options>
              </BottomSheet>
            )}
          </div>
        )}
      </Combobox>
    </div>
  );
}
