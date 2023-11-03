import { components } from "src/__generated/api";
import { QUERY_TAGS } from "src/api/ReactQuery/query-tags";
import { BaseQueryOptions, useBaseQuery } from "src/api/ReactQuery/useBaseQuery";

const REWARDS_TAGS = {
  all: [QUERY_TAGS.REWARDS],
  me: () => [...REWARDS_TAGS.all, QUERY_TAGS.ME],
  me_amount: () => [...REWARDS_TAGS.me(), "amount"],
  project: (id: string) => [...REWARDS_TAGS.all, QUERY_TAGS.PROJECTS, { projectId: id }],
  details: (key: ReadonlyArray<unknown>) => [...key, "detail"],
  detail: (key: ReadonlyArray<unknown>, id: string) => [...REWARDS_TAGS.details(key), { id }],
};

const REWARDS_API_PATH = {
  GET_MY_REWARDS: "/api/v1/me/rewards",
  MY_REWARD_BY_ID: "/api/v1/me/rewards/{{id}}", // ✅
  GET_MY_REWARD_ITEMS_BY_ID: "/api/v1/me/rewards/{{id}}/reward-items",
  GET_PROJECT_REWARDS_LIST: "/api/v1/projects/{{id}}/rewards",
  PROJECT_REWARD: "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}", // ✅
  GET_PROJECT_REWARD_ITEMS: "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}/reward-items",
  PROJECT_REWARDS: "/api/v1/projects/{{id}}/rewards",
};

export const useMyRewardsByIdQuery = (
  params: { rewardId?: string },
  options?: BaseQueryOptions<components["schemas"]["RewardResponse"]>
) => {
  return useBaseQuery<components["schemas"]["RewardResponse"]>({
    resourcePath: REWARDS_API_PATH.MY_REWARD_BY_ID,
    tags: REWARDS_TAGS.detail(REWARDS_TAGS.me(), params.rewardId || ""),
    pathParam: params,
    method: "GET",
    enabled: !!params.rewardId,
    ...(options || {}),
  });
};

export const useProjectRewardsByIdQuery = (
  params: { rewardId?: string; projectId?: string },
  options?: BaseQueryOptions<components["schemas"]["RewardResponse"]>
) => {
  return useBaseQuery<components["schemas"]["RewardResponse"]>({
    resourcePath: REWARDS_API_PATH.PROJECT_REWARD,
    tags: REWARDS_TAGS.detail(REWARDS_TAGS.project(params.projectId || ""), params.rewardId || ""),
    pathParam: params,
    method: "GET",
    enabled: !!params.rewardId && !!params.projectId,
    ...(options || {}),
  });
};
