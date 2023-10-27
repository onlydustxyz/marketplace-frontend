import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";

export type ProfilePublic = components["schemas"]["PublicUserProfileResponse"];
export type ProfilePrivate = components["schemas"]["GetMeResponse"];
export type Profile = ProfilePublic;

export default function useRestfulProfile({
  githubUserLogin,
  githubUserId,
}: {
  githubUserLogin?: string;
  githubUserId?: number;
}) {
  const { data, isLoading, isError } = useRestfulData<Profile>({
    resourcePath: githubUserLogin
      ? ApiResourcePaths.GET_PUBLIC_USER_PROFILE_BY_LOGIN
      : ApiResourcePaths.GET_PUBLIC_USER_PROFILE,
    pathParam: `${githubUserId || githubUserLogin}`,
    method: "GET",
    enabled: !!githubUserId || !!githubUserLogin,
  });

  return {
    data: data,
    loading: isLoading,
    isError: isError,
  };
}
