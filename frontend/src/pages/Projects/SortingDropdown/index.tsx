import { Listbox } from "@headlessui/react";
import Arrow from "src/assets/icons/Arrow";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CheckLine from "src/icons/CheckLine";

export enum Sorting {
  Trending = "trending",
  ProjectName = "projectName",
  ReposCount = "reposCount",
  ContributorsCount = "contributorsCount",
}

export const PROJECT_SORTINGS = [Sorting.Trending, Sorting.ProjectName, Sorting.ReposCount, Sorting.ContributorsCount];

type Props = {
  all: Sorting[];
  current: Sorting;
  onChange: (value: Sorting) => void;
};

export default function SortingDropdown({ all, current, onChange }: Props) {
  const { T } = useIntl();

  return (
    <Listbox
      value={current}
      onChange={onChange}
      as="div"
      className="h-fit w-fit divide-y divide-greyscale-50/12 rounded-md border border-greyscale-50/12 bg-white/2 font-walsheim text-sm font-medium text-greyscale-50 shadow-heavy backdrop-blur-4xl"
    >
      <Listbox.Button className="flex flex-row items-center gap-2 py-1.5 pl-4 pr-2">
        <Arrow />
        <div className="flex flex-row items-center gap-1">
          <span>{T("projects.sorting.label")}</span>
          <span className="text-spacePurple-500">{T(`projects.sorting.${current}`).toLowerCase()}</span>
        </div>
        <ArrowDownSLine className="text-xl ui-open:rotate-180" />
      </Listbox.Button>
      <Listbox.Options className="flex cursor-pointer flex-col divide-y divide-greyscale-50/12 bg-white/2 backdrop-blur-4xl">
        {all.map(value => (
          <Listbox.Option
            key={value}
            value={value}
            className="flex flex-row items-center justify-between px-4 py-3 hover:bg-white/5"
          >
            <span>{T(`projects.sorting.${value}`)}</span>
            <CheckLine className="-my-1 hidden text-xl ui-selected:block" />
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
