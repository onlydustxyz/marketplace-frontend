import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent } from "react";

import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TSelectSort } from "./select-sort.types";

export function SelectSort({ options, value, labelToken, onChange }: TSelectSort.Props) {
  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <Select
      items={options}
      selectedKeys={value ? [value] : []}
      selectionMode="single"
      onChange={handleSelectionChange}
      labelPlacement="outside"
      popoverProps={{
        offset: 0,
        classNames: {
          content: "border-card-border-medium border-1 border-t-0 rounded-t-none bg-card-background-base px-0",
        },
      }}
      listboxProps={{
        itemClasses: {
          base: "data-[hover=true]:bg-spaceBlue-800 hover:bg-spaceBlue-800 data-[selectable=true]:focus:bg-spaceBlue-800 focus:bg-spaceBlue-800 rounded-md py-1.5",
        },
      }}
      classNames={{
        base: "w-auto inline-flex",
        mainWrapper: "w-auto block",
        selectorIcon: "static",
        innerWrapper: "w-auto",
        trigger: cn(
          "w-auto rounded-md border border-card-border-medium bg-card-background-base py-1.5 pl-4 pr-2 shadow-heavy transition-all duration-300 ease-in",
          "data-[open=true]:rounded-b-none  data-[open=true]:border-b-transparent",
          "data-[hover=true]:bg-spaceBlue-900"
        ),
      }}
      renderValue={items => {
        return (
          <div className="flex flex-row items-center gap-2">
            <Icon customName="arrow" size={20} />
            <div className="flex flex-row items-center gap-1">
              <span>
                <Translate token={labelToken} />
              </span>
              <span className="text-spacePurple-500">{items[0]?.data?.label?.toLowerCase()}</span>
            </div>
          </div>
        );
      }}
    >
      {option => (
        <SelectItem
          key={option.id}
          textValue={option.label}
          className="flex flex-row items-center justify-between px-4 py-3"
        >
          <span>{option.label}</span>
          <Icon remixName="ri-check-line" size={20} className="-my-1 hidden ui-selected:block" />
        </SelectItem>
      )}
    </Select>
  );
}
