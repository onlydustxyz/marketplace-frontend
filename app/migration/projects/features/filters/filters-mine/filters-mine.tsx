import { useContext } from "react";

import { useIntl } from "src/hooks/useIntl";

import { Toggle } from "components/ds/form/toggle/toggle";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersMine() {
  const { T } = useIntl();
  const { filters } = useContext(ProjectsContext);

  const onFilterChange = (value: boolean) => {
    filters.set({ mine: value });
  };

  return (
    <Flex justifyContent="between" alignItems={"center"} className="gap-2">
      <Typography
        className="text-greyscale-50"
        variant="body-s"
        translate={{ token: "v2.pages.projects.filters.myProjectsLabel" }}
      />
      <Toggle
        value={filters.values.mine}
        onChange={onFilterChange}
        ariaLabel={T("v2.pages.projects.filters.myProjectsLabel")}
      />
    </Flex>
  );
}
