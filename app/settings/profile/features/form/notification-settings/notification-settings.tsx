import { UserNotificationCategories } from "core/domain/user/user-constants";
import { Controller, useFormContext } from "react-hook-form";

import { TProfileForm } from "app/settings/profile/features/form/form.types";
import { NotificationSettingsItem } from "app/settings/profile/features/form/notification-settings/notification-settings-item/notification-settings-item";
import { NotificationSwitch } from "app/settings/profile/features/form/notification-settings/notification-switch/notification-switch";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

enum Channel {
  EMAIL = "Email",
  SUMMARY = "summary",
}

export function NotificationSettings() {
  const { control, setValue } = useFormContext<TProfileForm.Data>();
  function handleEnableAll(type: Channel, v: boolean) {
    if (type === Channel.EMAIL) {
      setValue(`notifications.${UserNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR}.email`, v);
    } else {
      setValue(`notifications.${UserNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR}.summary`, v);
    }
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
              onChange={v => handleEnableAll(Channel.SUMMARY, v)}
            />
          </Flex>
        </Flex>

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
                <Controller
                  key={"email"}
                  name={`notifications.${UserNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR}.email`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
                <Controller
                  key={"summary"}
                  name={`notifications.${UserNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR}.summary`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
              ],
            },
          ]}
        />
      </Flex>
    </Card>
  );
}
