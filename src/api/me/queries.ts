import { components } from "src/__generated/api";
import { useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { API_PATH } from "../ApiPath";
import { ME_TAGS } from "./tags";

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

export default { useMyRewardsInfiniteList };
