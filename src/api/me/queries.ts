import { components } from "src/__generated/api";
import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { ME_TAGS } from "./tags";

export type UseGetUserMeResponse = components["schemas"]["GetMeResponse"];

const useGetMe = ({ options = {} }: UseQueryProps<UseGetUserMeResponse, undefined>) => {
  return useBaseQuery<UseGetUserMeResponse>({
    resourcePath: API_PATH.ME,
    tags: ME_TAGS.all,
    ...options,
  });
};

export type UseMyRewardsInfiniteListResponse = components["schemas"]["MyRewardsPageResponse"];

const useMyRewardsInfiniteList = (
  params: Partial<Parameters<typeof useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>>[0]>,
  options: Parameters<typeof useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>>[1] = {}
) => {
  return useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>(
    {
      ...params,
      resourcePath: API_PATH.ME_REWARDS,
      tags: ME_TAGS.rewards(),
      pageSize: 15,
    },
    options
  );
};

export default { useGetMe, useMyRewardsInfiniteList };
