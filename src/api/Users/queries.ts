import { components } from "src/__generated/api";
import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { USERS_TAGS } from "./tags";

const useUsersSearchByLogin = ({
  params,
  options,
}: UseQueryProps<components["schemas"]["ContributorSearchItemResponse"][], { login?: string }>) => {
  return useBaseQuery<components["schemas"]["ContributorSearchItemResponse"][]>({
    resourcePath: API_PATH.USERS_SEARCH_BY_LOGIN,
    pathParam: params,
    queryParams: params,
    method: "GET",
    tags: USERS_TAGS.users(),
    retry: 0,
    ...(options || {}),
  });
};

export default { useUsersSearchByLogin };
