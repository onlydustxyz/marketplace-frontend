import { useContext, useMemo } from "react";
import { Sort } from "@/components/ds/Sort/Sort.tsx";
import { SortOption } from "@/components/ds/Sort";
import { useIntl } from "src/hooks/useIntl.tsx";
import { ProjectsContext } from "../../context/project.context.tsx";
import { Sorting } from "../../context/project.context.type.ts";
function ProjectsSort() {
  const { T } = useIntl();
  const { filters } = useContext(ProjectsContext);

  const options: SortOption[] = useMemo(
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

export default ProjectsSort;
