import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";
import { Flex } from "components/layout/flex/flex";
import { FiltersTechnologies } from "./filters-technologies/filters-technologies";
import { FiltersSponsors } from "./filters-sponsors/filters-sponsors";
import { FiltersClearAll } from "./clear-all/clear-all";
import { FiltersHighlight } from "app/migration/projects/features/filters/filters-highlight/filters-highlight";

export function ProjectsFilters() {
  return (
    <Card className="flex h-fit flex-col gap-4">
      <Flex justifyContent="between" alignItems="center">
        <Typography variant="title-s" translate={{ token: "filter.title" }} />
        <FiltersClearAll />
      </Flex>

      <FiltersHighlight />
      <FiltersTechnologies />
      <FiltersSponsors />
    </Card>
  );
}
