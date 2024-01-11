import { useContext, useMemo } from "react";
import { useIntl } from "src/hooks/useIntl";
import { ProjectsContext } from "../../context/project.context";
import { Sorting } from "../../context/project.context.types";
import { TSort } from "components/ds/sort/sort.types";
import { Sort } from "components/ds/sort/sort";

export function ProjectsSort() {
  const { T } = useIntl();
  const { filters } = useContext(ProjectsContext);

  const options: TSort.Option[] = useMemo(
    () => [
      {
        label: T(`projects.sorting.${Sorting.Trending}`),
        id: Sorting.Trending,
      },
      {
        label: T(`projects.sorting.${Sorting.ProjectName}`),
        id: Sorting.ProjectName,
      },
      {
        label: T(`projects.sorting.${Sorting.ReposCount}`),
        id: Sorting.ReposCount,
      },
      {
        label: T(`projects.sorting.${Sorting.ContributorsCount}`),
        id: Sorting.ContributorsCount,
      },
    ],
    []
  );

  const onSortChange = (value: Sorting) => {
    filters.set({ sorting: value });
  };

  return (
    <Sort
      label={T("projects.sorting.label")}
      value={filters.values.sorting}
      onChange={onSortChange}
      options={options}
    />
  );
}
