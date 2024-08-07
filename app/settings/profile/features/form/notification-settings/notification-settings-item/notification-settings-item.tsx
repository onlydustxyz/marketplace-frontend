import { Flex } from "src/components/New/Layout/Flex";

import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";

import { TNotificationSettingsItem } from "./notification-settings-item.types";

export function NotificationSettingsItem({ title, items }: TNotificationSettingsItem.Props) {
  console.log("title", title);
  return (
    <Card background={false} border={"medium"}>
      <Flex direction="col" className="w-full gap-3">
        <Flex direction="row" className="w-full items-center justify-between">
          <div className="flex flex-1">
            <Typography translate={title} variant={"body-s"} className="text-spacePurple-50" />
          </div>
          <Flex direction="row" className="w-fit items-center justify-end">
            <div className="flex h-auto w-48 flex-col items-end justify-start gap-1">
              <Typography
                translate={{ token: "v2.pages.settings.profile.notificationSettings.email" }}
                variant={"body-s-bold"}
              />
            </div>
            {/*// TODO KEEP THIS WHEN BACKEND IS READY FOR SUMMARY EMAIL */}
            {/*<div className="flex h-auto w-48 flex-col items-end justify-start gap-1">*/}
            {/*  <div className="flex w-fit flex-row items-center justify-end gap-1">*/}
            {/*    <Typography*/}
            {/*      translate={{ token: "v2.pages.settings.profile.notificationSettings.weeklySummary" }}*/}
            {/*      variant={"body-s-bold"}*/}
            {/*    />*/}
            {/*    <Tooltip*/}
            {/*      content={<Translate token={"v2.pages.settings.profile.notificationSettings.weeklySummaryTooltip"} />}*/}
            {/*    >*/}
            {/*      <Icon remixName={"ri-information-line"} />*/}
            {/*    </Tooltip>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </Flex>
        </Flex>
        {items.map((item, key) => (
          <Flex key={key} direction="row" className="w-full items-center justify-between">
            <Flex direction="col" className="flex-1 gap-1">
              <Typography variant="body-s-bold" translate={item.label} />
              <Typography variant="body-s" className="text-spaceBlue-200" translate={item.content} />
            </Flex>
            <Flex direction="row" className="w-fit items-center justify-end">
              {item.switch[0]}
              {/*// TODO KEEP THIS WHEN BACKEND IS READY FOR SUMMARY EMAIL */}
              {/*{item.switch[1]}*/}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
