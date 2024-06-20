import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";

import { TContributorDetails } from "./contributor-details.types";

export function ContributorDetails(_: TContributorDetails.Props) {
  return (
    <Flex direction="col" className="flex-1 gap-6">
      Public card
      <Card background="base" hasPadding={false} border={false}>
        <Flex className="p-4">Details</Flex>
      </Card>
    </Flex>
  );
}
