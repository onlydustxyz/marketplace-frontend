import { useContext, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { ProjectTypes } from "src/api/Project/types";
import { viewportConfig } from "src/config";

import { Button } from "components/ds/button/button";
import { SelectSort } from "components/ds/form/select-sort/select-sort";
import { TSelectSort } from "components/ds/form/select-sort/select-sort.types";
import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { BottomSheet } from "components/ds/modals/bottom-sheet/bottom-sheet";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";

import { ProjectsContext } from "../../context/project.context";

export function ProjectsSort() {
  const { T } = useIntl();
  const [openMobilePanel, setOpenMobilePanel] = useState(false);
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);
  const { filters } = useContext(ProjectsContext);

  const options: TSelectSort.Option[] = useMemo(
    () => [
      {
        label: T(`v2.commons.enums.project.sort.${ProjectTypes.Sorting.Trending}`),
        id: ProjectTypes.Sorting.Trending,
      },
      {
        label: T(`v2.commons.enums.project.sort.${ProjectTypes.Sorting.ProjectName}`),
        id: ProjectTypes.Sorting.ProjectName,
      },
      {
        label: T(`v2.commons.enums.project.sort.${ProjectTypes.Sorting.ContributorsCount}`),
        id: ProjectTypes.Sorting.ContributorsCount,
      },
    ],
    []
  );

  const onSortChange = (value: ProjectTypes.Sorting | null) => {
    filters.set({ sorting: value || ProjectTypes.Sorting.Trending });
  };

  if (!isLg) {
    return (
      <>
        <Button variant={"secondary"} size="s" onClick={() => setOpenMobilePanel(true)}>
          <Translate token="v2.pages.projects.sorting.button" />
        </Button>
        <BottomSheet
          onClose={() => setOpenMobilePanel(false)}
          background="blue"
          open={openMobilePanel}
          title={<Translate token="v2.pages.projects.sorting.label" as="div" />}
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
      labelToken="v2.pages.projects.sorting.label"
      value={filters.values.sorting}
      onChange={value => onSortChange(value as ProjectTypes.Sorting)}
      options={options}
    />
  );
}
