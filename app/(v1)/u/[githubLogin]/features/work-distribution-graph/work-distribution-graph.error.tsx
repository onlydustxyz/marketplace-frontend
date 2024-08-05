import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function WorkDistributionGraphError() {
  return (
    <Flex direction="col" width="full" className="gap-4">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.workDistribution.title" }} />
      <Card background={"base"}>
        <Typography variant="body-m" translate={{ token: "v2.pages.publicProfile.workDistribution.error" }} />
      </Card>
    </Flex>
  );
}
