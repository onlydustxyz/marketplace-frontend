import { components } from "src/__generated/api";

type UserNotificationsResponse = components["schemas"]["NotificationSettingsForProjectResponse"];

export interface UserNotificationsInterface extends UserNotificationsResponse {}

class UserNotifications implements UserNotificationsInterface {
  id!: UserNotificationsResponse["id"];
  logoUrl!: UserNotificationsResponse["logoUrl"];
  name!: UserNotificationsResponse["name"];
  onGoodFirstIssueAdded!: UserNotificationsResponse["onGoodFirstIssueAdded"];
  slug!: UserNotificationsResponse["slug"];

  constructor(props: UserNotificationsResponse) {
    Object.assign(this, props);
  }
}

export { UserNotifications };
