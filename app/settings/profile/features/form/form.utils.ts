import { UserNotificationSettingsInterface } from "core/domain/user/models/user-notification-settings-model";
import { UserNotificationCategories } from "core/domain/user/user-constants";
import { SetMyNotificationSettingsBody } from "core/domain/user/user-contract.types";

import { UseGetMyProfileInfoResponse } from "src/api/me/queries";

import { TProfileForm } from "./form.types";

export function sanitizeContactHandle(contact: string) {
  let sanitizedContact = contact;

  if (contact.endsWith("/")) {
    sanitizedContact = sanitizedContact.slice(0, -1);
  }

  if (contact.includes("/")) {
    sanitizedContact = sanitizedContact.split("/").at(-1) ?? "";
  }

  if (contact.startsWith("@")) {
    sanitizedContact = sanitizedContact.substring(1);
  }

  return sanitizedContact;
}

export function createContact({
  channel,
  contact,
  isPublic,
  prefixUrl,
}: TProfileForm.CreateContactProps): TProfileForm.Contact {
  return {
    channel,
    contact: contact ? `${prefixUrl || ""}${sanitizeContactHandle(contact)}` : "",
    visibility: isPublic ? "public" : "private",
  };
}

export function formatToData(
  data: UseGetMyProfileInfoResponse,
  notificationSettings: UserNotificationSettingsInterface
): TProfileForm.Data {
  const { firstName, lastName, contactEmail, avatarUrl, location, bio, website, contacts, allocatedTimeToContribute } =
    data;

  function getContactInfo(contact: TProfileForm.Contact["channel"]) {
    const contactInfo = contacts?.find(contactInfo => contactInfo.channel === contact);

    return {
      contact: sanitizeContactHandle(contactInfo?.contact ?? ""),
      isPublic: contactInfo?.visibility === "public",
    };
  }

  return {
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    contactEmail: contactEmail ?? "",
    avatarUrl: avatarUrl ?? "",
    location: location ?? "",
    bio: bio ?? "",
    website: website ?? "",
    telegram: getContactInfo("TELEGRAM"),
    whatsapp: getContactInfo("WHATSAPP"),
    twitter: getContactInfo("TWITTER"),
    discord: getContactInfo("DISCORD"),
    linkedin: getContactInfo("LINKEDIN"),
    weeklyAllocatedTime: allocatedTimeToContribute ?? TProfileForm.ALLOCATED_TIME.NONE,
    lookingForAJob: data.isLookingForAJob ?? false,
    notifications: {
      MAINTAINER_PROJECT_CONTRIBUTOR: notificationSettings.findCategory("MAINTAINER_PROJECT_CONTRIBUTOR"),
      MAINTAINER_PROJECT_PROGRAM: notificationSettings.findCategory("MAINTAINER_PROJECT_PROGRAM"),
      CONTRIBUTOR_REWARD: notificationSettings.findCategory("CONTRIBUTOR_REWARD"),
      CONTRIBUTOR_PROJECT: notificationSettings.findCategory("CONTRIBUTOR_PROJECT"),
      GLOBAL_BILLING_PROFILE: notificationSettings.findCategory("GLOBAL_BILLING_PROFILE"),
      GLOBAL_MARKETING: notificationSettings.findCategory("GLOBAL_MARKETING"),
      SPONSOR_LEAD: notificationSettings.findCategory("SPONSOR_LEAD"),
      PROGRAM_LEAD: notificationSettings.findCategory("PROGRAM_LEAD"),
    },
  };
}

export function formatSettingsToSchema(data: Pick<TProfileForm.Data, "notifications">): SetMyNotificationSettingsBody {
  function findChannel(notification: TProfileForm.Data["notifications"]["MAINTAINER_PROJECT_CONTRIBUTOR"]) {
    const channels: SetMyNotificationSettingsBody["notificationSettings"][0]["channels"] = ["IN_APP"];

    if (notification.EMAIL) {
      channels.push("EMAIL");
    }

    if (notification.SUMMARY_EMAIL) {
      channels.push("SUMMARY_EMAIL");
    }

    return channels;
  }

  if (data.notifications) {
    return {
      notificationSettings: [
        {
          category: UserNotificationCategories.MAINTAINER_PROJECT_CONTRIBUTOR,
          channels: findChannel(data.notifications.MAINTAINER_PROJECT_CONTRIBUTOR),
        },
        {
          category: UserNotificationCategories.MAINTAINER_PROJECT_PROGRAM,
          channels: findChannel(data.notifications.MAINTAINER_PROJECT_PROGRAM),
        },
        {
          category: UserNotificationCategories.CONTRIBUTOR_REWARD,
          channels: findChannel(data.notifications.CONTRIBUTOR_REWARD),
        },
        {
          category: UserNotificationCategories.CONTRIBUTOR_PROJECT,
          channels: findChannel(data.notifications.CONTRIBUTOR_PROJECT),
        },
        {
          category: UserNotificationCategories.GLOBAL_BILLING_PROFILE,
          channels: findChannel(data.notifications.GLOBAL_BILLING_PROFILE),
        },
        {
          category: UserNotificationCategories.GLOBAL_MARKETING,
          channels: findChannel(data.notifications.GLOBAL_MARKETING),
        },
        {
          category: UserNotificationCategories.PROGRAM_LEAD,
          channels: findChannel(data.notifications.PROGRAM_LEAD),
        },
        {
          category: UserNotificationCategories.SPONSOR_LEAD,
          channels: findChannel(data.notifications.SPONSOR_LEAD),
        },
      ].filter(({ channels }) => channels.length > 0) as SetMyNotificationSettingsBody["notificationSettings"],
    };
  }

  return { notificationSettings: [] };
}

export function formatToSchema(data: Omit<TProfileForm.Data, "notifications">) {
  const {
    firstName,
    lastName,
    avatarUrl,
    location,
    bio,
    website,
    telegram,
    whatsapp,
    twitter,
    discord,
    linkedin,
    weeklyAllocatedTime,
    lookingForAJob,
    contactEmail,
  } = data;

  return {
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    avatarUrl: avatarUrl || undefined,
    location: location || undefined,
    contactEmail: contactEmail || undefined,
    bio: bio || undefined,
    website: website || undefined,
    contacts: [
      createContact({
        channel: "TELEGRAM",
        contact: telegram.contact,
        isPublic: telegram.isPublic,
        prefixUrl: "https://t.me/",
      }),
      createContact({
        channel: "WHATSAPP",
        contact: whatsapp.contact,
        isPublic: whatsapp.isPublic,
      }),
      createContact({
        channel: "TWITTER",
        contact: twitter.contact,
        isPublic: twitter.isPublic,
        prefixUrl: "https://x.com/",
      }),
      createContact({
        channel: "DISCORD",
        contact: discord.contact,
        isPublic: discord.isPublic,
      }),
      createContact({
        channel: "LINKEDIN",
        contact: linkedin.contact,
        isPublic: linkedin.isPublic,
        prefixUrl: "https://www.linkedin.com/in/",
      }),
    ],
    allocatedTimeToContribute: weeklyAllocatedTime,
    isLookingForAJob: lookingForAJob,
  };
}
