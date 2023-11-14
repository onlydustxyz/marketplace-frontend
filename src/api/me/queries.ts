import { components } from "src/__generated/api";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { API_PATH } from "../ApiPath";
import { ME_TAGS } from "./tags";

export type UseGetUserMeResponse = components["schemas"]["GetMeResponse"];

const useGetMe = ({ options = {} }: UseQueryProps<UseGetUserMeResponse, undefined>) => {
  return useBaseQuery<UseGetUserMeResponse>({
    resourcePath: API_PATH.ME,
    tags: ME_TAGS.all,
    ...options,
  });
};

export default { useGetMe };
