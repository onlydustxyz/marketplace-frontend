import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { FiltersClearAll } from "./clear-all/clear-all";
import { FiltersOwnership } from "./filters-ownership/filters-ownership";
import { FiltersSponsors } from "./filters-sponsors/filters-sponsors";
import { FiltersTechnologies } from "./filters-technologies/filters-technologies";

export function ProjectsFilters() {
  return (
    <Card className="flex h-fit flex-col gap-4">
      <Flex justifyContent="between" alignItems="center">
        <Typography variant="title-s" translate={{ token: "filter.title" }} />
        <FiltersClearAll />
      </Flex>

      <FiltersOwnership />
      <FiltersTechnologies />
      <FiltersSponsors />
    </Card>
  );
}
