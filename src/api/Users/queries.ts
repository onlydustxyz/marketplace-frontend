import { components } from "src/__generated/api";
import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { USERS_TAGS } from "./tags";

const useUsersSearchByLogin = ({
  params,
  options = {},
}: UseQueryProps<components["schemas"]["ContributorSearchResponse"], { login?: string }>) => {
  return useBaseQuery<components["schemas"]["ContributorSearchResponse"]>({
    resourcePath: API_PATH.USERS_SEARCH_BY_LOGIN,
    queryParams: params,
    tags: USERS_TAGS.users(),
    retry: 0,
    ...options,
  });
};

export default { useUsersSearchByLogin };
