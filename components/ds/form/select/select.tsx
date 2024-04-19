import { Select as NextSelect, SelectItem } from "@nextui-org/react";

import { cn } from "src/utils/cn";

import { TSelect } from "components/ds/form/select/select.types";

export function Select({ selectItemProps, isElevated, ...props }: TSelect.Props) {
  return (
    <NextSelect
      classNames={{
        trigger: cn(
          "border border-card-border-light bg-card-background-medium hover:bg-card-background-medium px-2.5 py-1.5 text-greyscale-50 shadow-light",
          "data-[open=true]:border-spacePurple-400 data-[open=true]:bg-spacePurple-900 data-[open=true]:hover:bg-spacePurple-900 data-[open=true]:text-spacePurple-400 data-[open=true]:outline-double data-[open=true]:outline-1 data-[open=true]:outline-spacePurple-400 data-[open=true]:outline-offset-0"
        ),
        value: cn("text-greyscale-50 text-base placeholder:text-greyscale-50", "data-[open=true]:text-spacePurple-400"),
        popoverContent: cn("border border-card-border-light shadow-medium", {
          "bg-greyscale-900": !isElevated,
          "bg-greyscale-800": isElevated,
        }),
      }}
      listboxProps={{
        itemClasses: {
          base: "rounded-md p-2 data-[hover=true]:bg-card-background-medium data-[selectable=true]:focus:bg-card-background-medium",
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
