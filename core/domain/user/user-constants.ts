import { components } from "src/__generated/api";

export const LOCAL_STORAGE_JOINING_REASON_KEY = "joiningReason";

export enum USER_PROFILE_JOINING_REASON {
  CONTRIBUTOR = "CONTRIBUTOR",
  MAINTAINER = "MAINTAINER",
  SPONSOR = "SPONSOR",
}

type categories = components["schemas"]["NotificationSettingResponse"]["category"];

export const UserNotificationCategories: { [key in categories]: key } = {
  MAINTAINER_PROJECT_CONTRIBUTOR: "MAINTAINER_PROJECT_CONTRIBUTOR",
  MAINTAINER_PROJECT_PROGRAM: "MAINTAINER_PROJECT_PROGRAM",
  CONTRIBUTOR_REWARD: "CONTRIBUTOR_REWARD",
  CONTRIBUTOR_PROJECT: "CONTRIBUTOR_PROJECT",
  KYC_KYB_BILLING_PROFILE: "KYC_KYB_BILLING_PROFILE",
};

type channels = components["schemas"]["NotificationSettingResponse"]["channels"][0];

export const UserNotificationChannels: { [key in channels]: key } = {
  EMAIL: "EMAIL",
  SUMMARY_EMAIL: "SUMMARY_EMAIL",
  IN_APP: "IN_APP",
};
