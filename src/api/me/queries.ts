import { components } from "src/__generated/api";
import { useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { API_PATH } from "../ApiPath";
import { ME_TAGS } from "./tags";

export type useMyRewardsInfiniteListResponse = components["schemas"]["MyRewardsPageResponse"];

const useMyRewardsInfiniteList = (
  params: Partial<Parameters<typeof useInfiniteBaseQuery>[0]>,
  options: Parameters<typeof useInfiniteBaseQuery<useMyRewardsInfiniteListResponse>>[1] = {}
) => {
  return useInfiniteBaseQuery<useMyRewardsInfiniteListResponse>(
    {
      ...params,
      resourcePath: API_PATH.ME_REWARDS,
      tags: ME_TAGS.rewards(),
    },
    options
  );
};

export default { useMyRewardsInfiniteList };
