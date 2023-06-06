import { UserProfileFragment } from "src/__generated/graphql";

export type UserProfileInfo = {
  location: string;
  bio: string;
  website: string;
};

export const fromFragment = (profile: UserProfileFragment): UserProfileInfo => ({
  bio: profile.bio || "",
  location: profile.location || "",
  website: profile.website || "",
});
