import { useContext, useMemo, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import { ProjectsContext } from "../../context/project.context";
import { ProjectTypes } from "src/api/Project/types";
import { SelectSort } from "components/ds/form/select-sort/select-sort";
import { TSelectSort } from "components/ds/form/select-sort/select-sort.types";
import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "src/config";
import { Translate } from "components/layout/translate/translate";
import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { BottomSheet } from "components/ds/modals/bottom-sheet/bottom-sheet";
import { Button } from "components/ds/button/button";

export function ProjectsSort() {
  const { T } = useIntl();
  const [openMobilePanel, setOpenMobilePanel] = useState(false);
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
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

  const onSortChange = (value: ProjectTypes.Sorting | null) => {
    filters.set({ sorting: value || ProjectTypes.Sorting.Trending });
  };

  if (!isXl) {
    return (
      <>
        <Button variant={"secondary"} size="s" onClick={() => setOpenMobilePanel(true)}>
          <Translate token="projects.sorting.button" />
        </Button>
        <BottomSheet
          onClose={() => setOpenMobilePanel(false)}
          open={openMobilePanel}
          title={<Translate token="projects.sorting.label" as="div" />}
        >
          <SelectableTag
            mode="single"
            value={filters.values.sorting}
            onChange={onSortChange}
            options={options.map(({ id, label }) => ({
              children: label,
              value: id as ProjectTypes.Sorting,
            }))}
          />
        </BottomSheet>
      </>
    );
  }

  return (
    <SelectSort
      labelToken="projects.sorting.label"
      value={filters.values.sorting}
      onChange={value => onSortChange(value as ProjectTypes.Sorting)}
      options={options}
    />
  );
}
