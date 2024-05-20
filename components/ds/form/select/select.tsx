import { Select as NextSelect, SelectItem } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TSelect } from "components/ds/form/select/select.types";

export function Select({ selectItemProps, classNames, variant = "blue", ...props }: TSelect.Props) {
  return (
    <NextSelect
      classNames={{
        trigger: cn(
          "px-2",
          "border rounded-large shadow-light",
          "data-[open=true]:border-spacePurple-400 data-[open=true]:bg-spacePurple-900 data-[open=true]:hover:bg-spacePurple-900 data-[open=true]:text-spacePurple-400 data-[open=true]:outline-double data-[open=true]:outline-1 data-[open=true]:outline-spacePurple-400 data-[open=true]:outline-offset-0",
          {
            "bg-card-background-base hover:bg-card-background-base border-card-border-light": variant === "blue",
            "bg-white/5 hover:bg-white/5 border-greyscale-50/8": variant === "grey",
          }
        ),
        value: cn(
          "od-text-body-s-bold text-greyscale-50 placeholder:text-greyscale-50 data-[open=true]:text-spacePurple-400 font-medium"
        ),
        popoverContent: cn("border rounded-large shadow-medium p-3", {
          "bg-card-background-base border-card-border-medium": variant === "blue",
          "bg-greyscale-900 border-default-200 border-greyscale-50/12": variant === "grey",
        }),
        ...classNames,
      }}
      listboxProps={{
        itemClasses: {
          base: cn(
            "opacity-100", // Need this to override disabled styles
            "rounded-large px-2 py-2.5",
            "data-[hover=true]:bg-card-background-light data-[selectable=true]:focus:bg-card-background-light",
            "data-[selected=true]:bg-card-background-medium data-[selected=true]:data-[hover=true]:bg-card-background-medium data-[selected=true]:data-[selectable=true]:focus:bg-card-background-medium"
          ),
        },
      }}
      {...props}
    >
      {({ value, label, ...item }) => (
        <SelectItem key={value} value={value} {...item} {...selectItemProps}>
          {label}
        </SelectItem>
      )}
    </NextSelect>
  );
}
