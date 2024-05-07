import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TWorkDistributionGraph } from "./work-distribution-graph.types";

export function WorkDistributionGraph(_: TWorkDistributionGraph.Props) {
  return (
    <Flex direction="col" width="full" className="gap-4">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.workDistribution" }} />

      <Card>TODO</Card>
    </Flex>
  );
}
