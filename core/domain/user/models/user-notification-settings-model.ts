import { components } from "src/__generated/api";

type UserNotificationSettingsResponse = components["schemas"]["NotificationSettingsForProjectResponse"];

export interface UserNotificationSettingsInterface extends UserNotificationSettingsResponse {}

class UserNotificationSettings implements UserNotificationSettingsInterface {
  id!: UserNotificationSettingsResponse["id"];
  logoUrl!: UserNotificationSettingsResponse["logoUrl"];
  name!: UserNotificationSettingsResponse["name"];
  onGoodFirstIssueAdded!: UserNotificationSettingsResponse["onGoodFirstIssueAdded"];
  slug!: UserNotificationSettingsResponse["slug"];

  constructor(props: UserNotificationSettingsResponse) {
    Object.assign(this, props);
  }
}

export { UserNotificationSettings };
