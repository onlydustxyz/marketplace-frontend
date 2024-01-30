import { useContext, useMemo } from "react";
import { useIntl } from "src/hooks/useIntl";
import { ProjectsContext } from "../../context/project.context";
import { ProjectTypes } from "src/api/Project/types";
import { SelectSort } from "components/ds/form/select-sort/select-sort";
import { TSelectSort } from "components/ds/form/select-sort/select-sort.types";

export function ProjectsSort() {
  const { T } = useIntl();
  const { filters } = useContext(ProjectsContext);

  const options: TSelectSort.Option[] = useMemo(
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
    <SelectSort
      labelToken="projects.sorting.label"
      value={filters.values.sorting}
      onChange={onSortChange}
      options={options}
    />
  );
}
