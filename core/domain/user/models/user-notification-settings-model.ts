import { UserNotificationSettingsCategoryType } from "core/domain/user/models/user.types";
import { UserNotificationChannels } from "core/domain/user/user-constants";

import { components } from "src/__generated/api";

type UserNotificationSettingsResponse = components["schemas"]["NotificationSettingsResponse"];

export interface UserNotificationSettingsInterface extends UserNotificationSettingsResponse {
  findCategory(category: UserNotificationSettingsCategoryType): {
    [UserNotificationChannels.EMAIL]: boolean;
    [UserNotificationChannels.SUMMARY_EMAIL]: boolean;
  };
}

class UserNotificationSettings implements UserNotificationSettingsInterface {
  notificationSettings!: UserNotificationSettingsResponse["notificationSettings"];

  constructor(props: UserNotificationSettingsResponse) {
    Object.assign(this, props);
  }

  findCategory(category: UserNotificationSettingsCategoryType) {
    const cat = this.notificationSettings.find(setting => setting.category === category);
    return {
      [UserNotificationChannels.EMAIL]: cat?.channels.includes(UserNotificationChannels.EMAIL) || false,
      [UserNotificationChannels.SUMMARY_EMAIL]: cat?.channels.includes(UserNotificationChannels.SUMMARY_EMAIL) || false,
    };
  }
}

export { UserNotificationSettings };
