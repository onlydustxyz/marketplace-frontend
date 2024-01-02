import { FC } from "react";
import Card from "components/ds/card/card";
import { Typography } from "@/components/layout/typography/typography";
import { Flex } from "@/components/layout/flex/flex";
import Translate from "@/components/layout/translate/translate";
import { ClearAllButton } from "./clear-all-button";
import { Tags } from "./tags/tags";

export const Filters: FC = () => {
  const isProjectLeader = true;

  return (
    <Card className="flex h-fit flex-col gap-4">
      <Flex justifyContent="between" alignItems="center">
        <Typography variant="title-s">
          <Translate token="filter.title" />
        </Typography>

        <ClearAllButton />
      </Flex>

      {isProjectLeader && <Tags type="global" />}

      <Tags type="technologies" />
    </Card>
  );
};
