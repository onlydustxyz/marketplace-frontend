import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";

import { TContributorSelect } from "./contributor-select.types";

export function ContributorSelect(_: TContributorSelect.Props) {
  return (
    <div className="h-full w-80">
      <Card background="base" hasPadding={false} border={false} className="rounded-lg">
        <Flex className="p-3">Select</Flex>
      </Card>
    </div>
  );
}
