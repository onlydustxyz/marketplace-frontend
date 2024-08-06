import { components } from "src/__generated/api";

type UserNotificationSettingsResponse = components["schemas"]["NotificationSettingsResponse"];
type UserNotificationSettingsChannel = UserNotificationSettingsResponse["notificationSettings"][0]["channels"][0];

export interface UserNotificationSettingsInterface extends UserNotificationSettingsResponse {
  isAllNotificationsEnabled(channel: UserNotificationSettingsChannel): boolean;
  isAllEmailNotificationsEnabled(): boolean;
  isAllSummaryEmailNotificationsEnabled(): boolean;
}

class UserNotificationSettings implements UserNotificationSettingsInterface {
  notificationSettings!: UserNotificationSettingsResponse["notificationSettings"];

  constructor(props: UserNotificationSettingsResponse) {
    Object.assign(this, props);
  }

  isAllNotificationsEnabled(channel: UserNotificationSettingsChannel) {
    return this.notificationSettings.every(setting => setting.channels.includes(channel));
  }

  isAllEmailNotificationsEnabled() {
    return this.isAllNotificationsEnabled("EMAIL");
  }

  isAllSummaryEmailNotificationsEnabled() {
    return this.isAllNotificationsEnabled("SUMMARY_EMAIL");
  }
}

export { UserNotificationSettings };
