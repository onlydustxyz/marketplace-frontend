import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context";
import { useIntl } from "src/hooks/useIntl";
import { Toggle } from "components/ds/form/toggle/toggle";
import { Typography } from "components/layout/typography/typography";
import { Flex } from "components/layout/flex/flex";

export function FiltersMine() {
  const { T } = useIntl();
  const { filters } = useContext(ProjectsContext);

  const onFilterChange = (value: boolean) => {
    filters.set({ mine: value });
  };

  return (
    <Flex justifyContent="between" alignItems={"center"} className="gap-2">
      <Typography className="text-greyscale-50" variant="body-s" translate={{ token: "filter.showMyProject" }} />
      <Toggle value={filters.values.mine} onChange={onFilterChange} ariaLabel={T("filter.showMyProject")} />
    </Flex>
  );
}
