import { FC } from "react";
import Card from "components/ds/card/card";
import { Typography } from "@/components/layout/typography/typography";
import { Flex } from "@/components/layout/flex/flex";
import Translate from "@/components/layout/translate/translate";
import { ClearAllButton } from "./clear-all-button";

export const Filters: FC = () => {
  return (
    <Card>
      <Flex justifyContent="between" alignItems="center">
        <Typography variant="title-s">
          <Translate token="filter.title" />
        </Typography>

        <ClearAllButton />
      </Flex>
    </Card>
  );
};
