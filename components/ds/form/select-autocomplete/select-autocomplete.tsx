import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Combobox, Transition } from "@headlessui/react";
import { ChangeEvent, useRef } from "react";

import { cn } from "src/utils/cn";

import { Button } from "./components/button/button";
import { Options } from "./components/options/options";
import { SelectAutocompleteHooks as Hooks } from "./select-autocomplete.hooks";
import { TSelectAutocomplete } from "./select-autocomplete.types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import users from "src/api/Users";

/**
 * TODO :
 * controle shouldFlip props
 * */
export function SelectAutocomplete<T extends TSelectAutocomplete.Item>({
  disabled = false,
  icon,
  items,
  tokens,
  type,
  ...comboProps
}: TSelectAutocomplete.Props<T>) {
  const selectedRef = useRef(comboProps.selected);
  const { current: selected } = selectedRef;
  const { selected: selectedTracked } = comboProps;
  const container = useRef<HTMLDivElement>(null);

  console.log("container.current?.offsetWidth", container.current?.offsetWidth);
  return (
    <div className={cn("relative z-[1]", `w-[${container.current?.offsetWidth}px]`)}>
      <Autocomplete
        multiple={true}
        classNames={{
          base: "max-w-xs",
          // listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500",
        }}
        defaultItems={items}
        inputProps={{
          classNames: {
            input:
              "ml-1 group-data-[focus=true]:text-spacePurple-400 group-data-[focus=true]:placeholder:text-spacePurple-400",
            inputWrapper: cn(
              "relative flex w-full h-5 items-center gap-6 rounded-lg border border-card-border-light bg-card-background-medium px-2.5 py-1.5 text-greyscale-50 shadow-light",
              "group-data-[focus=true]:bg-spacePurple-900 group-data-[focus=true]:border-spacePurple-400 group-data-[focus=true]:outline-1 group-data-[focus=true]:border-[2px]"
            ),
            // mainWrapper:
            //   "relative z-[1] after:w-[calc(100%_+_24px)] after:h-[calc(100%_+_24px)] after:bg-greyscale-800 after:absolute after:-top-3 after:-left-3 after:-z-[1] after:rounded-xl",
          },
        }}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              "rounded-medium",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "dark:data-[hover=true]:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[hover=true]:bg-default-200",
              "data-[selectable=true]:focus:bg-default-100",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        aria-label="Select an employee"
        placeholder="Enter employee name"
        shouldCloseOnBlur={false}
        popoverProps={{
          offset: -52,
          crossOffset: 0,
          // shouldFlip: false,
          isOpen: true,
          shouldCloseOnBlur: false,
          // portalContainer: document.querySelector(".test-wrapper-class") || undefined,
          portalContainer: container.current || undefined,
          classNames: {
            trigger: "bg-red-500",
            base: "rounded-xl bg-red-500",
            content: cn(
              "p-1 bg-greyscale-800 py-2 w-[calc(100%_+_24px)] -ml-3 -translate-x-3 data-[placement=top]:pb-[52px] data-[placement=bottom]:pt-[52px]"
            ),
          },
        }}
        startContent={icon?.({
          className: "text-default-500 group-data-[focus=true]:text-spacePurple-400",
          selected: [],
        })}
      >
        {item => (
          <AutocompleteItem key={item.id} textValue={item.value}>
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <div ref={container} className="absolute bottom-0 left-0 right-0 top-0 -z-[1]" />
    </div>
  );
}
