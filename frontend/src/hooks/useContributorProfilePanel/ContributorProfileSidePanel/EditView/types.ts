import {
  AllocatedTime,
  Channel,
  OwnUserProfileDetailsFragment,
  ProfileCover,
  UpdateUserProfileMutationVariables,
  UserProfileFragment,
} from "src/__generated/graphql";
import { LanguageMap } from "src/types";
import { translateProfileCover } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/utils";

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
  twitter: string;
  isTwitterPublic: boolean;
  discord: string;
  isDiscordPublic: boolean;
  linkedin: string;
  isLinkedInPublic: boolean;
  languages: LanguageMap;
  weeklyAllocatedTime: AllocatedTime;
  lookingForAJob: boolean;
  cover: ProfileCover;
};

export const fromFragment = (fragment: UserProfileFragment & OwnUserProfileDetailsFragment): UserProfileInfo => ({
  bio: fragment.bio ?? "",
  location: fragment.location ?? "",
  website: fragment.website ?? "",
  githubHandle: fragment.login ?? "",
  isGithubHandlePublic: true,
  email: fragment.contacts.email?.contact || "",
  isEmailPublic: fragment.contacts.email?.public ?? false,
  telegram: fragment.contacts.telegram?.contact?.split("/").at(-1) ?? "",
  isTelegramPublic: fragment.contacts.telegram?.public ?? true,
  twitter: fragment.contacts.twitter?.contact?.split("/").at(-1) ?? "",
  isTwitterPublic: fragment.contacts.twitter?.public ?? true,
  discord: fragment.contacts.discord?.contact ?? "",
  isDiscordPublic: fragment.contacts.discord?.public ?? true,
  linkedin: fragment.contacts.linkedin?.contact?.split("/").at(-1) ?? "",
  isLinkedInPublic: fragment.contacts.linkedin?.public ?? true,
  languages: fragment.languages ?? {},
  weeklyAllocatedTime: translateTimeAllocation(fragment.weeklyAllocatedTime) ?? AllocatedTime.None,
  lookingForAJob: fragment.lookingForAJob ?? false,
  cover: translateProfileCover(fragment.cover) ?? ProfileCover.Blue,
});

export const toVariables = (profile: UserProfileInfo): UpdateUserProfileMutationVariables => ({
  bio: profile.bio,
  contactInformations: [
    { channel: Channel.Email, contact: profile.email, public: profile.isEmailPublic },
    {
      channel: Channel.Telegram,
      contact: profile.telegram && `https://t.me/${profile.telegram}`,
      public: profile.isTelegramPublic,
    },
    {
      channel: Channel.Twitter,
      contact: profile.twitter && `https://twitter.com/${profile.twitter}`,
      public: profile.isTwitterPublic,
    },
    { channel: Channel.Discord, contact: profile.discord, public: profile.isDiscordPublic },
    {
      channel: Channel.LinkedIn,
      contact: profile.linkedin && `https://www.linkedin.com/in/${profile.linkedin}`,
      public: profile.isLinkedInPublic,
    },
  ],
  languages: Object.entries(profile.languages).map(([name, weight]) => ({ name, weight })),
  location: profile.location,
  lookingForAJob: profile.lookingForAJob,
  website: profile.website,
  weeklyAllocatedTime: profile.weeklyAllocatedTime,
  cover: profile.cover,
});

const translateTimeAllocation = (timeAllocation: string): AllocatedTime | undefined => {
  switch (timeAllocation) {
    case "none":
      return AllocatedTime.None;
    case "lt1day":
      return AllocatedTime.LessThanOneDay;
    case "1to3days":
      return AllocatedTime.OneToThreeDays;
    case "gt3days":
      return AllocatedTime.MoreThanThreeDays;
    default:
      return undefined;
  }
};
