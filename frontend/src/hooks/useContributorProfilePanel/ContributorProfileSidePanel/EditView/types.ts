import { UserProfileFragment } from "src/__generated/graphql";

export type UserProfileInfo = {
  location: string;
  bio: string;
  website: string;
  githubHandle: string;
  email: string;
  telegram: string;
  twitter: string;
  discord: string;
  linkedin: string;
};

export const fromFragment = (profile: UserProfileFragment): UserProfileInfo => ({
  bio: profile.bio || "",
  location: profile.location || "",
  website: profile.website || "",
  githubHandle: profile.login || "",
  email: profile.email || "",
  telegram: profile.telegram || "",
  twitter: profile.twitter || "",
  discord: profile.discord || "",
  linkedin: profile.linkedin || "",
});
