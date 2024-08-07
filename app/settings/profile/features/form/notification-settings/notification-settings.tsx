import { UserNotificationSettingsChannelType } from "core/domain/user/models/user.types";
import { UserNotificationCategories, UserNotificationChannels } from "core/domain/user/user-constants";
import { Controller, useFormContext } from "react-hook-form";

import { TProfileForm } from "app/settings/profile/features/form/form.types";
import { NotificationSettingsItem } from "app/settings/profile/features/form/notification-settings/notification-settings-item/notification-settings-item";
import { NotificationSwitch } from "app/settings/profile/features/form/notification-settings/notification-switch/notification-switch";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function NotificationSettings() {
  const { control, setValue, watch } = useFormContext<TProfileForm.Data>();
  const notifications = watch("notifications");

  function getAllCategories() {
    if (!notifications) return [];
    return [
      UserNotificationCategories.KYC_KYB_BILLING_PROFILE,
      UserNotificationCategories.CONTRIBUTOR_PROJECT,
      UserNotificationCategories.CONTRIBUTOR_REWARD,
      UserNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR,
      UserNotificationCategories.MAINTAINER_PROJECT_PROGRAM,
    ];
  }
  function isChannelEnabled(channel: UserNotificationSettingsChannelType) {
    if (!notifications) return false;
    return getAllCategories().every(c => notifications[c]?.[channel]);
  }

  function enableAll(channel: UserNotificationSettingsChannelType, v: boolean) {
    if (!notifications) return false;
    return getAllCategories().forEach(cat => {
      setValue(`notifications.${cat}.${channel}`, v, { shouldDirty: true });
    });
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
          <Flex direction="row" className="w-fit items-center justify-end pr-4 lg:pr-6">
            <NotificationSwitch
              label={{ token: "v2.pages.settings.profile.notificationSettings.enableAll" }}
              value={isChannelEnabled(UserNotificationChannels.EMAIL)}
              onChange={v => enableAll("EMAIL", v)}
            />
            {/*// TODO KEEP THIS WHEN BACKEND IS READY FOR SUMMARY EMAIL */}
            {/*<NotificationSwitch*/}
            {/*  label={{ token: "v2.pages.settings.profile.notificationSettings.enableAll" }}*/}
            {/*  value={isChannelEnabled(UserNotificationChannels.SUMMARY_EMAIL)}*/}
            {/*  onChange={v => enableAll("SUMMARY_EMAIL", v)}*/}
            {/*/>*/}
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
                  name={`notifications.${UserNotificationCategories.KYC_KYB_BILLING_PROFILE}.EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
                <Controller
                  key={"summary"}
                  name={`notifications.${UserNotificationCategories.KYC_KYB_BILLING_PROFILE}.SUMMARY_EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
              ],
            },
          ]}
        />

        <NotificationSettingsItem
          title={{ token: "v2.pages.settings.profile.notificationSettings.contributor.title" }}
          items={[
            {
              label: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.contributor.project.label",
              },
              content: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.contributor.project.content",
              },
              switch: [
                <Controller
                  key={"email"}
                  name={`notifications.${UserNotificationCategories.CONTRIBUTOR_PROJECT}.EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
                <Controller
                  key={"summary"}
                  name={`notifications.${UserNotificationCategories.CONTRIBUTOR_PROJECT}.SUMMARY_EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
              ],
            },
            {
              label: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.contributor.reward.label",
              },
              content: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.contributor.reward.content",
              },
              switch: [
                <Controller
                  key={"email"}
                  name={`notifications.${UserNotificationCategories.CONTRIBUTOR_REWARD}.EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
                <Controller
                  key={"summary"}
                  name={`notifications.${UserNotificationCategories.CONTRIBUTOR_REWARD}.SUMMARY_EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
              ],
            },
          ]}
        />

        <NotificationSettingsItem
          title={{ token: "v2.pages.settings.profile.notificationSettings.maintainer.title" }}
          items={[
            {
              label: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.maintainer.contributors.label",
              },
              content: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.maintainer.contributors.content",
              },
              switch: [
                <Controller
                  key={"email"}
                  name={`notifications.${UserNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR}.EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
                <Controller
                  key={"summary"}
                  name={`notifications.${UserNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR}.SUMMARY_EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
              ],
            },
            {
              label: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.maintainer.program.label",
              },
              content: {
                token: "v2.pages.settings.profile.notificationSettings.notifications.maintainer.program.content",
              },
              switch: [
                <Controller
                  key={"email"}
                  name={`notifications.${UserNotificationCategories.MAINTAINER_PROJECT_PROGRAM}.EMAIL`}
                  control={control}
                  render={({ field }) => <NotificationSwitch {...field} />}
                />,
                <Controller
                  key={"summary"}
                  name={`notifications.${UserNotificationCategories.MAINTAINER_PROJECT_PROGRAM}.SUMMARY_EMAIL`}
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
