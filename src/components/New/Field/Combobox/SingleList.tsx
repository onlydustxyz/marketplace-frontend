import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { cn } from "src/utils/cn";

type SingleProps<T> = {
  items: T[];
  itemKeyName: string;
  loading: boolean;
  renderItem: ({ item, selected, active }: { item: T; selected: boolean; active: boolean }) => JSX.Element;
};

export function SingleList<T>({ items, itemKeyName, loading, renderItem }: SingleProps<T>) {
  if (items.length <= 0 || loading) return null;

  return (
    <>
      {items?.map((item, key) => (
        <HeadlessCombobox.Option
          key={item[itemKeyName as keyof T]?.toString() || key}
          className={({ active }) =>
            cn("relative cursor-pointer select-none py-2", {
              "bg-white/2": active,
            })
          }
          value={item}
        >
          {({ selected, active }) => renderItem({ item, selected, active })}
        </HeadlessCombobox.Option>
      ))}
    </>
  );
}
