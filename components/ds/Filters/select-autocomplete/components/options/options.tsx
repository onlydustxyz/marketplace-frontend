import { TOptions } from "./options.types";
import { Combobox } from "@headlessui/react";
import { Option } from "../option/option";

export function Options({ selectedItems, filteredItems, type }: TOptions.Props) {
  return (
    <>
      <div className="max-h-60 divide-y divide-card-border-light overflow-auto px-2 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        {selectedItems.length ? (
          <div className="flex flex-col gap-1 pb-2">
            {selectedItems.map(item => (
              <Combobox.Option key={item.id} value={item}>
                {({ active, selected }) => <Option selected={selected} active={active} type={type} item={item} />}
              </Combobox.Option>
            ))}
          </div>
        ) : null}
        <div className="pt-2">
          {filteredItems.map(item => (
            <Combobox.Option key={item.id} value={item}>
              {({ active, selected }) => <Option selected={selected} active={active} type={type} item={item} />}
            </Combobox.Option>
          ))}
        </div>
      </div>
    </>
  );
}
