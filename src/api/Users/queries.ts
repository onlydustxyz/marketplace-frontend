import { components } from "src/__generated/api";
import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { USERS_TAGS } from "./tags";

const useUsersSearchByLogin = ({
  params,
  options = {},
}: UseQueryProps<
  components["schemas"]["ContributorSearchResponse"],
  { login?: string; projectId?: string; externalSearchOnly?: string }
>) => {
  const queryParams: { login?: string; projectId?: string; externalSearchOnly?: string } = {
    login: params?.login,
    ...(params?.projectId ? { projectId: params.projectId } : {}),
    ...(params?.externalSearchOnly ? { externalSearchOnly: params?.externalSearchOnly } : {}),
  };
  return useBaseQuery<components["schemas"]["ContributorSearchResponse"]>({
    resourcePath: API_PATH.USERS_SEARCH_BY_LOGIN,
    queryParams,
    tags: USERS_TAGS.users(),
    retry: 0,
    ...options,
  });
};

export type UserProfile = components["schemas"]["PublicUserProfileResponse"];

const useUserProfileByGithubId = ({ params, options = {} }: UseQueryProps<UserProfile, { githubUserId?: string }>) => {
  return useBaseQuery<UserProfile>({
    resourcePath: API_PATH.USER_PROFILE_BY_GITHUB_ID(params?.githubUserId ?? ""),
    enabled: !!params?.githubUserId,
    tags: USERS_TAGS.user_profile_by_github_id(params?.githubUserId ?? ""),
    ...options,
  });
};

const useUserProfileByGithubLogin = ({ params, options = {} }: UseQueryProps<UserProfile, { login?: string }>) => {
  return useBaseQuery<UserProfile>({
    resourcePath: API_PATH.USER_PROFILE_BY_GITHUB_LOGIN(params?.login ?? ""),
    enabled: !!params?.login,
    tags: USERS_TAGS.user_profile_by_github_login(params?.login ?? ""),
    ...options,
  });
};

export default { useUsersSearchByLogin, useUserProfileByGithubId, useUserProfileByGithubLogin };
