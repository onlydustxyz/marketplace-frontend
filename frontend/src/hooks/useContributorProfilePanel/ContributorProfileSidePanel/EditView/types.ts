import { UserProfileFragment } from "src/__generated/graphql";
import { LanguageMap, WeeklyTimeAllocation } from "src/types";

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
  weeklyAllocatedTime: WeeklyTimeAllocation;
  lookingForAJob: boolean;
};

export function fromFragment(fragment: UserProfileFragment) {
  return {
    bio: fragment.bio || "",
    location: fragment.location || "",
    website: fragment.website || "",
    githubHandle: fragment.login || "",
    isGithubHandlePublic: true,
    email: fragment.email.at(0)?.contact || "",
    isEmailPublic: fragment.email.at(0)?.public ?? true,
    telegram: fragment.telegram.at(0)?.contact || "",
    isTelegramPublic: fragment.telegram.at(0)?.public ?? true,
    twitter: fragment.twitter.at(0)?.contact || "",
    isTwitterPublic: fragment.twitter.at(0)?.public ?? true,
    discord: fragment.discord.at(0)?.contact || "",
    isDiscordPublic: fragment.discord.at(0)?.public ?? true,
    linkedin: fragment.linkedin.at(0)?.contact || "",
    isLinkedInPublic: fragment.linkedin.at(0)?.public ?? true,
    languages: fragment.languages,
    weeklyAllocatedTime: fragment.weeklyAllocatedTime,
    lookingForAJob: fragment.lookingForAJob || false,
  };
}
