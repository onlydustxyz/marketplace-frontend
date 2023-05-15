import { Listbox } from "@headlessui/react";
import Arrow from "src/assets/icons/Arrow";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CheckLine from "src/icons/CheckLine";
import { Sorting } from "..";

type Props = {
  all: Sorting[];
  current: Sorting;
  onChange: (value: Sorting) => void;
};

export default function SortingDropdown<T>({ all, current, onChange }: Props) {
  const { T } = useIntl();

  return (
    <Listbox
      value={current}
      onChange={onChange}
      as="div"
      className="bg-white/2 border border-greyscale-50/12 divide-y divide-greyscale-50/12 backdrop-blur-4xl rounded-md w-fit h-fit font-walsheim font-medium text-sm text-greyscale-50 shadow-heavy"
    >
      <Listbox.Button className="flex flex-row items-center gap-2 py-2 pl-4 pr-2">
        <Arrow />
        <div className="flex flex-row items-center gap-1">
          <span>{T("projects.sorting.label")}</span>
          <span className="text-spacePurple-500">{T(`projects.sorting.${current}`).toLowerCase()}</span>
        </div>
        <ArrowDownSLine className="text-xl ui-open:rotate-180" />
      </Listbox.Button>
      <Listbox.Options className="flex flex-col divide-y divide-greyscale-50/12 cursor-pointer backdrop-blur-4xl bg-white/2">
        {all.map(value => (
          <Listbox.Option
            key={value}
            value={value}
            className="flex flex-row items-center justify-between px-4 py-3 hover:bg-white/5"
          >
            <span>{T(`projects.sorting.${value}`)}</span>
            <CheckLine className="text-xl hidden ui-selected:block" />
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
