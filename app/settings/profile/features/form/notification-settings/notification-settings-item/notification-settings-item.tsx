import { Flex } from "src/components/New/Layout/Flex";

import { Tooltip } from "components/atoms/tooltip";
import { Card } from "components/ds/card/card";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TNotificationSettingsItem } from "./notification-settings-item.types";

export function NotificationSettingsItem({ title, items }: TNotificationSettingsItem.Props) {
  return (
    <Card background={false} border={"medium"}>
      <Flex direction="col" className="w-full gap-3">
        <Flex direction="row" className="w-full items-center justify-between">
          <div className="flex flex-1">
            <Typography translate={title} variant={"body-s"} />
          </div>
          <Flex direction="row" className="w-fit items-center justify-end">
            <div className="flex h-auto w-44 flex-col items-end justify-start gap-1">
              <Typography
                translate={{ token: "v2.pages.settings.profile.notificationSettings.email" }}
                variant={"body-s-bold"}
              />
            </div>
            <div className="flex h-auto w-44 flex-col items-end justify-start gap-1">
              <div className="flex w-fit flex-row items-center justify-end">
                <Typography
                  translate={{ token: "v2.pages.settings.profile.notificationSettings.weeklySummary" }}
                  variant={"body-s-bold"}
                />
                <Tooltip
                  content={<Translate token={"v2.pages.settings.profile.notificationSettings.weeklySummaryTooltip"} />}
                >
                  <Icon remixName={"ri-info-i-line"} />
                </Tooltip>
              </div>
            </div>
          </Flex>
        </Flex>
        <div>NOTIFICATION SETTINGS</div>
      </Flex>
    </Card>
  );
}
