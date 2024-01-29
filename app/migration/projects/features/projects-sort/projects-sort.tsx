import { useContext, useMemo } from "react";
import { useIntl } from "src/hooks/useIntl";
import { ProjectsContext } from "../../context/project.context";
import { TSort } from "components/ds/sort/sort.types";
import { Sort } from "components/ds/sort/sort";
import { ProjectTypes } from "src/api/Project/types";

export function ProjectsSort() {
  const { T } = useIntl();
  const { filters } = useContext(ProjectsContext);

  const options: TSort.Option[] = useMemo(
    () => [
      {
        label: T(`projects.sorting.${ProjectTypes.Sorting.Trending}`),
        id: ProjectTypes.Sorting.Trending,
      },
      {
        label: T(`projects.sorting.${ProjectTypes.Sorting.ProjectName}`),
        id: ProjectTypes.Sorting.ProjectName,
      },
      {
        label: T(`projects.sorting.${ProjectTypes.Sorting.ReposCount}`),
        id: ProjectTypes.Sorting.ReposCount,
      },
      {
        label: T(`projects.sorting.${ProjectTypes.Sorting.ContributorsCount}`),
        id: ProjectTypes.Sorting.ContributorsCount,
      },
    ],
    []
  );

  const onSortChange = (value: ProjectTypes.Sorting) => {
    filters.set({ sorting: value });
  };

  return (
    <Sort
      labelToken="projects.sorting.label"
      value={filters.values.sorting}
      onChange={onSortChange}
      options={options}
    />
  );
}
