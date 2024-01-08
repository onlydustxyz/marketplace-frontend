import { FC } from "react";
import Card from "components/ds/card/card";
import { Typography } from "@/components/layout/typography/typography";
import { Flex } from "@/components/layout/flex/flex";
import FiltersTechnologies from "./filters-technologies/filters-technologies.tsx";
import FiltersSponsors from "./filters-sponsors/filters-sponsors.tsx";
import FiltersOwnership from "./filters-ownership/filters-ownership.tsx";
import { FiltersClearAll } from "./clear-all/clear-all.tsx";

export const ProjectsFilters: FC = () => {
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
};
