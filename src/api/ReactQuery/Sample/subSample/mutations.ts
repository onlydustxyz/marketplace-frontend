import { UseMutationProps, useBaseMutation } from "src/api/ReactQuery/useBaseMutation";
import { SAMPLE_SUB_TAGS } from "./tags";

const REWARDS_API_PATH = {
  GET_MY_REWARDS: "/api/v1/me/rewards",
  MY_REWARD_BY_ID: "/api/v1/me/rewards/{{id}}", // ✅
  GET_MY_REWARD_ITEMS_BY_ID: "/api/v1/me/rewards/{{id}}/reward-items",
  GET_PROJECT_REWARDS_LIST: "/api/v1/projects/{{id}}/rewards",
  PROJECT_REWARD: "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}", // ✅
  GET_PROJECT_REWARD_ITEMS: "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}/reward-items",
  PROJECT_REWARDS: "/api/v1/projects/{{id}}/rewards",
};

const useCreateProjectRewardMutation = ({
  params,
  options,
}: UseMutationProps<{ sample: string }, { projectId?: string }, unknown>) => {
  return useBaseMutation<unknown, { sample: string }>({
    resourcePath: REWARDS_API_PATH.PROJECT_REWARD,
    pathParam: params?.projectId,
    method: "POST",
    enabled: !!params?.projectId,
    invalidatesTags: [{ queryKey: SAMPLE_SUB_TAGS.all, exact: true }],
    ...(options || {}),
  });
};

export default { useCreateProjectRewardMutation };
