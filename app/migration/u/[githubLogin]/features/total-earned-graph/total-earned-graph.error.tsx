import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function TotalEarnedGraphError() {
  return (
    <Flex direction="col" width="full" className="gap-4">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.totalEarned.title" }} />
      <Card background={"base"}>
        <Typography variant="body-m" translate={{ token: "v2.pages.publicProfile.totalEarned.error" }} />
      </Card>
    </Flex>
  );
}
