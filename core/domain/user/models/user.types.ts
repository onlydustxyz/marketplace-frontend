import { components } from "src/__generated/api";

export enum UserProfileContactChannel {
  discord = "DISCORD",
  linkedin = "LINKEDIN",
  telegram = "TELEGRAM",
  twitter = "TWITTER",
  whatsapp = "WHATSAPP",
}

export interface UserProfileContact {
  channel: `${UserProfileContactChannel}`;
  contact?: string;
  visibility: "public" | "private";
}

export type UserJoiningReason = components["schemas"]["UserProfileUpdateRequest"]["joiningReason"];

export type UserNotificationSettingsChannelType = Exclude<
  components["schemas"]["NotificationSettingsResponse"]["notificationSettings"][0]["channels"][0],
  "IN_APP"
>;

export type UserNotificationSettingsCategoryType =
  components["schemas"]["NotificationSettingsResponse"]["notificationSettings"][0]["category"];
