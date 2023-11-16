import { ReactElement } from "react";
import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { cn } from "src/utils/cn";

export type ItemType<T> = {
  label?: string;
  data: T[];
};

type MultiProps<T> = {
  items: ItemType<T>[];
  itemKeyName: string;
  loading: boolean;
  renderItem: ({ item, selected, active }: { item: T; selected: boolean; active: boolean }) => React.ReactNode;
};

export function MultiList<T>({ items, itemKeyName, loading, renderItem }: MultiProps<T>): ReactElement | null {
  const filteredItems = items.flatMap(item => item).filter(({ data }) => data.length > 0);

  if (filteredItems.length === 0 || loading) return null;

  return (
    <>
      {filteredItems?.map((item, index) => (
        <>
          {item.label && item.data.length > 0 ? (
            <div
              className={cn("text-body-s-bold border-none py-2 uppercase text-spaceBlue-200", {
                "pt-6": index > 0,
              })}
            >
              {item.label}
            </div>
          ) : null}
          {item.data.map((value: T, key) => {
            return (
              <HeadlessCombobox.Option
                key={value[itemKeyName as keyof T]?.toString() || key}
                className={({ active }) =>
                  cn("relative cursor-pointer select-none py-2", {
                    "bg-white/2": active,
                    "border-none": item.label && key === 0,
                  })
                }
                value={value}
              >
                {({ selected, active }) => renderItem({ item: value, selected, active }) as ReactElement}
              </HeadlessCombobox.Option>
            );
          })}
        </>
      ))}
    </>
  );
}
