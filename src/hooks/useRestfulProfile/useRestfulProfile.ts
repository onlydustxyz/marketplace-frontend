import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";

export type Profile = components["schemas"]["PublicUserProfileResponse"];

type IdProps = {
  githubUserLogin: string;
  githubUserId?: never;
};

type LoginProps = {
  githubUserLogin?: never;
  githubUserId: number;
};

export default function useRestfulProfile({ githubUserLogin, githubUserId }: IdProps | LoginProps) {
  return useRestfulData<Profile>({
    queryKey: ["resftullProfile", githubUserId],
    resourcePath: githubUserLogin
      ? ApiResourcePaths.GET_PUBLIC_USER_PROFILE_BY_LOGIN
      : ApiResourcePaths.GET_PUBLIC_USER_PROFILE,
    pathParam: `${githubUserId || githubUserLogin}`,
    method: "GET",
    enabled: !!githubUserId || !!githubUserLogin,
  });
}
