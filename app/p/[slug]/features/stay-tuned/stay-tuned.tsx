import { useState } from "react";

import { TStayTuned } from "app/p/[slug]/features/stay-tuned/stay-tuned.types";

import { Paper } from "components/atoms/paper";
import { Switch } from "components/atoms/switch";
import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function StayTuned({ projectId }: TStayTuned.Props) {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="divide-y divide-greyscale-50/8">
        <Flex alignItems="center" className="gap-2 px-6 py-4">
          <Icon remixName="ri-notification-3-line" size={20} />

          <Typography variant="body-m-bold" translate={{ token: "v2.pages.project.overview.stayTuned.title" }} />
        </Flex>
        <div className="flex flex-col gap-4 px-6 py-4">
          <Typography
            variant="body-s"
            className={"text-spaceBlue-200"}
            translate={{ token: "v2.pages.project.overview.stayTuned.description" }}
          />
          <div className="gao-2 flex flex-col">
            <Paper container="4" border="none" classNames={{ base: "flex gap-2 items-center px-4 py-2" }}>
              <Switch isActive={isNotificationEnabled} onChange={setIsNotificationEnabled} />
              <Typography
                variant="body-s-bold"
                translate={{ token: "v2.pages.project.overview.stayTuned.notifySwitchLabel" }}
              />
            </Paper>
          </div>
        </div>
      </Flex>
    </Card>
  );
}
