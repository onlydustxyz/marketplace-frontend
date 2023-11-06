import { UseQueryProps, useBaseQuery } from "src/api/ReactQuery/useBaseQuery";
import { SAMPLE_TAGS } from "./tags";

const REWARDS_API_PATH = {
  GET_MY_REWARDS: "/api/v1/me/rewards",
  MY_REWARD_BY_ID: "/api/v1/me/rewards/{{id}}", // ✅
  GET_MY_REWARD_ITEMS_BY_ID: "/api/v1/me/rewards/{{id}}/reward-items",
  GET_PROJECT_REWARDS_LIST: "/api/v1/projects/{{id}}/rewards",
  PROJECT_REWARD: "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}", // ✅
  GET_PROJECT_REWARD_ITEMS: "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}/reward-items",
  PROJECT_REWARDS: "/api/v1/projects/{{id}}/rewards",
};

const useSampleByIdQuery = ({ params, options }: UseQueryProps<{ sample: string }, { rewardId?: string }>) => {
  return useBaseQuery<{ sample: string }>({
    resourcePath: REWARDS_API_PATH.MY_REWARD_BY_ID,
    pathParam: params,
    method: "GET",
    enabled: !!params?.rewardId,
    tags: SAMPLE_TAGS.detail(SAMPLE_TAGS.me(), params?.rewardId || ""),
    ...(options || {}),
  });
};

const useProjectSampleByIdQuery = ({
  params,
  options,
}: UseQueryProps<{ sample: string }, { rewardId?: string; projectId?: string }>) => {
  return useBaseQuery<{ sample: string }>({
    resourcePath: REWARDS_API_PATH.PROJECT_REWARD,
    pathParam: params,
    method: "GET",
    enabled: !!params?.rewardId && !!params?.projectId,
    tags: SAMPLE_TAGS.detail(SAMPLE_TAGS.project(params?.projectId || ""), params?.rewardId || ""),
    ...(options || {}),
  });
};

export default { useProjectSampleByIdQuery, useSampleByIdQuery };
