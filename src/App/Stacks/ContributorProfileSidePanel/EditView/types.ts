import { LanguageMap } from "src/types";
import { UseUpdateProfileBody } from "src/api/me/mutations";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import { components } from "src/__generated/api";
import { translateProfileCover } from "../utils";

export enum Channel {
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

export enum ProfileCover {
  Blue = "BLUE",
  Cyan = "CYAN",
  Magenta = "MAGENTA",
  Yellow = "YELLOW",
}

export type UserProfileInfo = {
  location: string;
  bio: string;
  website: string;
  login: string;
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
  technologies: LanguageMap;
  weeklyAllocatedTime: components["schemas"]["PrivateUserProfileResponse"]["allocatedTimeToContribute"];
  lookingForAJob: boolean;
  cover: ProfileCover;
};

export const fromFragment = (profile: UseGetMyProfileInfoResponse): UserProfileInfo => {
  const { bio, location, website, login, contacts, technologies, allocatedTimeToContribute, isLookingForAJob, cover } =
    profile;

  const getContactInfo = (channel: Channel) => contacts?.find(contact => contact.channel === channel)?.contact;

  const isContactPublic = (channel: Channel) =>
    contacts?.find(contact => contact.channel === channel)?.visibility === "public" ?? true;

  return {
    bio: bio ?? "",
    location: location ?? "",
    website: website ?? "",
    login: login ?? "",
    isGithubHandlePublic: true,
    email: getContactInfo(Channel.Email) ?? "",
    isEmailPublic: isContactPublic(Channel.Email),
    telegram: getContactInfo(Channel.Telegram)?.split("/").at(-1) ?? "",
    isTelegramPublic: isContactPublic(Channel.Telegram),
    whatsapp: getContactInfo(Channel.Whatsapp) ?? "",
    isWhatsappPublic: isContactPublic(Channel.Whatsapp),
    twitter: getContactInfo(Channel.Twitter)?.split("/").at(-1) ?? "",
    isTwitterPublic: isContactPublic(Channel.Twitter),
    discord: getContactInfo(Channel.Discord) ?? "",
    isDiscordPublic: isContactPublic(Channel.Discord),
    linkedin: getContactInfo(Channel.LinkedIn) ?? "",
    isLinkedInPublic: isContactPublic(Channel.LinkedIn),
    technologies: technologies ?? {},
    weeklyAllocatedTime: allocatedTimeToContribute ?? AllocatedTime.None,
    lookingForAJob: isLookingForAJob ?? false,
    cover: translateProfileCover(cover || "") ?? ProfileCover.Blue,
  };
};

export const mapFormDataToSchema = (profile: UserProfileInfo): UseUpdateProfileBody => {
  const {
    bio,
    lookingForAJob,
    cover,
    location,
    website,
    weeklyAllocatedTime,
    email,
    telegram,
    whatsapp,
    twitter,
    discord,
    linkedin,
    technologies,
    isEmailPublic,
    isTelegramPublic,
    isWhatsappPublic,
    isTwitterPublic,
    isDiscordPublic,
    isLinkedInPublic,
  } = profile;
  return {
    bio,
    contacts: [
      createContact(Channel.Email, email, isEmailPublic),
      createContact(Channel.Telegram, telegram, isTelegramPublic, "https://t.me/"),
      createContact(Channel.Whatsapp, whatsapp, isWhatsappPublic),
      createContact(Channel.Twitter, twitter, isTwitterPublic, "https://twitter.com/"),
      createContact(Channel.Discord, discord, isDiscordPublic),
      createContact(Channel.LinkedIn, linkedin, isLinkedInPublic, "https://www.linkedin.com/in/"),
    ],
    technologies,
    location,
    isLookingForAJob: lookingForAJob,
    website,
    allocatedTimeToContribute: weeklyAllocatedTime as AllocatedTime,
    cover,
  };
};

function createContact(
  channel: components["schemas"]["ContactInformation"]["channel"],
  contact: string | null,
  isPublic: boolean,
  prefixUrl?: string
): components["schemas"]["ContactInformation"] {
  return {
    channel,
    contact: contact ? `${prefixUrl || ""}${sanitizeContactHandle(contact)}` : "",
    visibility: isPublic ? "public" : "private",
  };
}

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
