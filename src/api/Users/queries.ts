import { components } from "src/__generated/api";
import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { USERS_TAGS } from "./tags";

const useUsersSearchByLogin = ({
  params,
  options = {},
}: UseQueryProps<components["schemas"]["ContributorSearchResponse"], { login?: string; projectId?: string }>) => {
  const queryParams: { login?: string; projectId?: string } = {
    login: params?.login,
    ...(params?.projectId ? { projectId: params.projectId } : {}),
  };
  return useBaseQuery<components["schemas"]["ContributorSearchResponse"]>({
    resourcePath: API_PATH.USERS_SEARCH_BY_LOGIN,
    queryParams,
    tags: USERS_TAGS.users(),
    retry: 0,
    ...options,
  });
};

export default { useUsersSearchByLogin };
