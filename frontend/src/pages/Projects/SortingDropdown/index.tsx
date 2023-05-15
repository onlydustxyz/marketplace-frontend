import { Listbox } from "@headlessui/react";
import { useLocalStorage } from "react-use";
import Arrow from "src/assets/icons/Arrow";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CheckLine from "src/icons/CheckLine";

export enum Sorting {
  ProjectName = "projectName",
  ReposCount = "reposCount",
  ContributorsCount = "contributorsCount",
  MoneyGranted = "moneyGranted",
  LeftToSpend = "leftToSpend",
  TotalBudget = "totalBudget",
}

const PROJECT_SORTINGS = [
  Sorting.ProjectName,
  Sorting.ReposCount,
  Sorting.ContributorsCount,
  Sorting.MoneyGranted,
  Sorting.LeftToSpend,
  Sorting.TotalBudget,
];

export default function SortingDropdown() {
  const [projectSorting, setProjectSorting] = useLocalStorage("PROJECT_SORTING", Sorting.MoneyGranted);
  const { T } = useIntl();

  return (
    <Listbox
      value={projectSorting}
      onChange={setProjectSorting}
      as="div"
      className="bg-white/2 border border-greyscale-50/12 divide-y divide-greyscale-50/12 backdrop-blur-4xl rounded-md w-fit font-walsheim font-medium text-sm text-greyscale-50 shadow-heavy"
    >
      <Listbox.Button className="flex flex-row items-center gap-2 py-2 pl-4 pr-2">
        <Arrow />
        <div className="flex flex-row items-center gap-1">
          <span>{T("projects.sorting.label")}</span>
          <span className="text-spacePurple-500">{T(`projects.sorting.${projectSorting}`).toLowerCase()}</span>
        </div>
        <ArrowDownSLine className="text-xl ui-open:rotate-180" />
      </Listbox.Button>
      <Listbox.Options className="flex flex-col divide-y divide-greyscale-50/12 cursor-pointer">
        {PROJECT_SORTINGS.map(sorting => (
          <Listbox.Option
            key={sorting}
            value={sorting}
            className="flex flex-row items-center justify-between px-4 py-3 hover:bg-white/5"
          >
            <span>{T(`projects.sorting.${sorting}`)}</span>
            <CheckLine className="text-xl hidden ui-selected:block" />
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
