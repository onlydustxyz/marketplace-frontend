import { ProfileCover } from "src/__generated/graphql";
import { LanguageMap } from "src/types";
import { translateProfileCover } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/utils";
import { UseUpdateProfileBody } from "src/api/me/mutations";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import { components } from "src/__generated/api";

enum Channel {
  Discord = "DISCORD",
  Email = "EMAIL",
  LinkedIn = "LINKEDIN",
  Telegram = "TELEGRAM",
  Twitter = "TWITTER",
  Whatsapp = "WHATSAPP",
}

export enum AllocatedTime {
  LessThanOneDay = "LESS_THAN_ONE_DAY",
  GreaterThanThreeDays = "GREATER_THAN_THREE_DAYS",
  None = "NONE",
  OneToThreeDays = "ONE_TO_THREE_DAYS",
}

export type UserProfileInfo = {
  location: string;
  bio: string;
  website: string;
  githubHandle: string;
  isGithubHandlePublic: boolean;
  email: string;
  isEmailPublic: boolean;
  telegram: string;
  isTelegramPublic: boolean;
  whatsapp: string;
  isWhatsappPublic: boolean;
  twitter: string;
  isTwitterPublic: boolean;
  discord: string;
  isDiscordPublic: boolean;
  linkedin: string;
  isLinkedInPublic: boolean;
  languages: LanguageMap;
  weeklyAllocatedTime: components["schemas"]["PrivateUserProfileResponse"]["allocatedTimeToContribute"];
  lookingForAJob: boolean;
  cover: ProfileCover;
};

export const fromFragment = (profile: UseGetMyProfileInfoResponse): UserProfileInfo => ({
  bio: profile?.bio ?? "",
  location: profile?.location ?? "",
  website: profile?.website ?? "",
  githubHandle: profile?.login ?? "",
  isGithubHandlePublic: true,
  email: profile?.contacts?.find(contact => contact.channel === Channel.Email)?.contact ?? "",
  isEmailPublic: profile?.contacts?.find(contact => contact.channel === Channel.Email)?.visibility === "public" ?? true,
  telegram:
    profile?.contacts
      ?.find(contact => contact.channel === Channel.Telegram)
      ?.contact?.split("/")
      .at(-1) ?? "",
  isTelegramPublic:
    profile?.contacts?.find(contact => contact.channel === Channel.Telegram)?.visibility === "public" ?? true,
  whatsapp: profile?.contacts?.find(contact => contact.channel === Channel.Whatsapp)?.contact ?? "",
  isWhatsappPublic:
    profile?.contacts?.find(contact => contact.channel === Channel.Whatsapp)?.visibility === "public" ?? true,
  twitter:
    profile?.contacts
      ?.find(contact => contact.channel === Channel.Twitter)
      ?.contact?.split("/")
      .at(-1) ?? "",
  isTwitterPublic:
    profile?.contacts?.find(contact => contact.channel === Channel.Twitter)?.visibility === "public" ?? true,
  discord: profile?.contacts?.find(contact => contact.channel === Channel.Discord)?.contact ?? "",
  isDiscordPublic:
    profile?.contacts?.find(contact => contact.channel === Channel.Discord)?.visibility === "public" ?? true,
  linkedin: profile?.contacts?.find(contact => contact.channel === Channel.LinkedIn)?.contact ?? "",
  isLinkedInPublic:
    profile?.contacts?.find(contact => contact.channel === Channel.LinkedIn)?.visibility === "public" ?? true,
  languages: profile?.technologies ?? {},
  weeklyAllocatedTime: profile?.allocatedTimeToContribute ?? AllocatedTime.None,
  lookingForAJob: profile?.isLookingForAJob ?? false,
  cover: translateProfileCover(profile?.cover || "") ?? ProfileCover.Blue,
});

export const mapFormDataToSchema = (profile: UserProfileInfo): UseUpdateProfileBody => ({
  bio: profile.bio,
  contacts: [
    { channel: Channel.Email, contact: profile.email, visibility: profile.isEmailPublic ? "public" : "private" },
    {
      channel: Channel.Telegram,
      contact: profile.telegram && `https://t.me/${sanitizeContactHandle(profile.telegram)}`,
      visibility: profile.isTelegramPublic ? "public" : "private",
    },
    {
      channel: Channel.Whatsapp,
      contact: profile.whatsapp,
      visibility: profile.isWhatsappPublic ? "public" : "private",
    },
    {
      channel: Channel.Twitter,
      contact: profile.twitter && `https://twitter.com/${sanitizeContactHandle(profile.twitter)}`,
      visibility: profile.isTwitterPublic ? "public" : "private",
    },
    {
      channel: Channel.Discord,
      contact: profile.discord && sanitizeContactHandle(profile.discord),
      visibility: profile.isDiscordPublic ? "public" : "private",
    },
    {
      channel: Channel.LinkedIn,
      contact: profile.linkedin && `https://www.linkedin.com/in/${sanitizeContactHandle(profile.linkedin)}`,
      visibility: profile.isLinkedInPublic ? "public" : "private",
    },
  ],
  technologies: profile.languages,
  location: profile.location,
  isLookingForAJob: profile.lookingForAJob,
  website: profile.website,
  allocatedTimeToContribute: profile.weeklyAllocatedTime as AllocatedTime,
  cover: profile.cover,
});

function sanitizeContactHandle(contact: string) {
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
