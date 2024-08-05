import { useFormContext } from "react-hook-form";

import { NotificationSettingsItem } from "app/settings/profile/features/form/notification-settings/notification-settings-item/notification-settings-item";
import { NotificationSwitch } from "app/settings/profile/features/form/notification-settings/notification-switch/notification-switch";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

enum Channel {
  EMAIL = "Email",
  WEEKLY = "Weekly",
}

enum Notification {
  BILLING_PROFILE = "billing-profile",
}
export function NotificationSettings() {
  const { control } = useFormContext();
  function handleEnableAll(type: Channel, v: boolean) {
    console.log("ENABLE ALL", type, v);
    return false;
  }

  function onEnableOne(type: Notification, channel: Channel, value: boolean) {
    console.log("ENABLE one", type, channel, value);
  }

  return (
    <Card background="base">
      <Flex direction="col" className="flex-1 gap-3">
        <Flex direction="row" className="w-full items-center justify-between">
          <Flex direction="col" className="flex-1 gap-1">
            <Typography
              variant="title-s"
              translate={{ token: "v2.pages.settings.profile.notificationSettings.title" }}
            />
            <Typography
              variant="body-s"
              className="text-spaceBlue-200"
              translate={{ token: "v2.pages.settings.profile.notificationSettings.subtitle" }}
            />
          </Flex>
          <Flex direction="row" className="w-fit items-center justify-end">
            <NotificationSwitch
              label={{ token: "v2.pages.settings.profile.notificationSettings.enableAll" }}
              value={false}
              onChange={v => handleEnableAll(Channel.EMAIL, v)}
            />
            <NotificationSwitch
              label={{ token: "v2.pages.settings.profile.notificationSettings.enableAll" }}
              value={false}
              onChange={v => handleEnableAll(Channel.WEEKLY, v)}
            />
          </Flex>
        </Flex>

        {/*// */}
        <NotificationSettingsItem
          title={{ token: "v2.pages.settings.profile.notificationSettings.global.title" }}
          items={[
            {
              label: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.global.billingProfile.label",
              },
              content: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.global.billingProfile.content",
              },
              switch: [
                {
                  value: false,
                  onChange: v => onEnableOne(Notification.BILLING_PROFILE, Channel.EMAIL, v),
                },
                {
                  value: false,
                  onChange: v => onEnableOne(Notification.BILLING_PROFILE, Channel.WEEKLY, v),
                },
              ],
            },
          ]}
        />
      </Flex>
    </Card>
  );
}
