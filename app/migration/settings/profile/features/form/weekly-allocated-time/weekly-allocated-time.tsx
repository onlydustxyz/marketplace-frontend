import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function FormWeeklyAllocatedTime() {
  return (
    <Card background="base">
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="gap-1">
          <Typography
            variant="title-s"
            translate={{ token: "v2.pages.settings.publicProfile.weeklyAllocatedTime.title" }}
          />

          <Typography
            variant="body-s"
            translate={{ token: "v2.pages.settings.publicProfile.weeklyAllocatedTime.subtitle" }}
            className="text-spaceBlue-200"
          />
        </Flex>
      </Flex>{" "}
    </Card>
  );
}
