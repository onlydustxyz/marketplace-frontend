import { useUserProfileQuery } from "src/__generated/graphql";
import { contextWithCacheHeaders } from "src/utils/headers";

export default function useUserProfile(githubUserId: number) {
  const { data } = useUserProfileQuery({ variables: { githubUserId }, ...contextWithCacheHeaders });

  return {
    userProfile: data?.userProfiles.at(0),
  };
}
