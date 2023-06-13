import { UserProfileFragment } from "src/__generated/graphql";

export class UserProfileInfo {
  location: string;
  bio: string;
  website: string;
  githubHandle: string;

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

  constructor(fragment: UserProfileFragment) {
    this.bio = fragment.bio || "";
    this.location = fragment.location || "";
    this.website = fragment.website || "";
    this.githubHandle = fragment.login || "";
    this.email = fragment.email.at(0)?.contact || "";
    this.isEmailPublic = fragment.email.at(0)?.public ?? true;
    this.telegram = fragment.telegram.at(0)?.contact || "";
    this.isTelegramPublic = fragment.telegram.at(0)?.public ?? true;
    this.twitter = fragment.twitter.at(0)?.contact || "";
    this.isTwitterPublic = fragment.twitter.at(0)?.public ?? true;
    this.discord = fragment.discord.at(0)?.contact || "";
    this.isDiscordPublic = fragment.discord.at(0)?.public ?? true;
    this.linkedin = fragment.linkedin.at(0)?.contact || "";
    this.isLinkedInPublic = fragment.linkedin.at(0)?.public ?? true;
  }
}
