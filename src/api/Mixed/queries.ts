import { useAuth0 } from "@auth0/auth0-react";

import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";
import MeApi from "src/api/me";

import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { MIXED_TAGS } from "./tags";

export type UseGetRewards = components["schemas"]["RewardDetailsResponse"];
const useGetMixedReward = ({
  options = {},
  params,
}: UseQueryProps<UseGetRewards, { isMine: boolean; projectId?: string; rewardId: string }>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetRewards>({
    resourcePath: params?.isMine
      ? MeApi.path.REWARD_DETAIL(params.rewardId)
      : API_PATH.PROJECT_REWARD_DETAIL(params?.rewardId || "", params?.projectId || ""),
    method: "GET",
    tags: params?.isMine ? MIXED_TAGS.me_rewards(params?.rewardId) : MIXED_TAGS.project_rewards(params?.rewardId || ""),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export default {
  useGetMixedReward,
};
