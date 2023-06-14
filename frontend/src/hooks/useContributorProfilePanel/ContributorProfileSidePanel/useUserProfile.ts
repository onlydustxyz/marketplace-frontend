import { useQuery } from "@apollo/client";
import { OwnUserProfileDocument, UserProfileDocument, UserProfileQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { contextWithCacheHeaders } from "src/utils/headers";

export default function useUserProfile(githubUserId: number) {
  const { githubUserId: currentGithubUserId } = useAuth();

  const { data } = useQuery<UserProfileQuery>(
    currentGithubUserId === githubUserId ? OwnUserProfileDocument : UserProfileDocument,
    { variables: { githubUserId }, ...contextWithCacheHeaders }
  );

  return {
    userProfile: data?.userProfiles.at(0),
  };
}
