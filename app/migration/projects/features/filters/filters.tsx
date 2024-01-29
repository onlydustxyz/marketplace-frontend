import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";
import { Flex } from "components/layout/flex/flex";
import { FiltersTechnologies } from "./filters-technologies/filters-technologies";
import { FiltersClearAll } from "./clear-all/clear-all";
import { FiltersHighlight } from "app/migration/projects/features/filters/filters-highlight/filters-highlight";

export function ProjectsFilters() {
  return (
    <Card className="flex h-fit flex-col" background="base" border="medium" hasPadding={false}>
      <Flex justifyContent="between" alignItems="center" className="border-b-1 border-card-border-medium px-6 py-4">
        <Typography variant="title-s" translate={{ token: "filter.title" }} />
        <FiltersClearAll />
      </Flex>
      <div className="border-b-1 border-card-border-medium px-6 py-4">
        <FiltersHighlight />
      </div>
      <div className="border-b-1 border-card-border-medium px-6 py-4">
        <FiltersTechnologies />
      </div>
    </Card>
  );
}
