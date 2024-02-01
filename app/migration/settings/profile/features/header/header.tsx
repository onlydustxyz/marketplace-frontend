import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function ProfileHeader() {
  return (
    <Card className="mb-2">
      <Flex direction="col" className="gap-1">
        <Typography
          variant="title-m"
          translate={{
            token: "settings.publicProfile.title",
          }}
        />
        <Typography
          variant="body-s"
          translate={{
            token: "settings.publicProfile.subtitle",
          }}
          className="text-spaceBlue-200"
        />
      </Flex>
    </Card>
  );
}
