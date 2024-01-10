import { components } from "src/__generated/api";
import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { ME_TAGS } from "./tags";
import { useAuth0 } from "@auth0/auth0-react";

export type UseGetRewards = components["schemas"]["RewardDetailsResponse"];
const useGetReward = ({
  options = {},
  params,
}: UseQueryProps<UseGetRewards, { isMine: boolean; projectId?: string; rewardId: string }>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetRewards>({
    resourcePath: params?.isMine
      ? API_PATH.ME_REWARD_DETAIL(params.rewardId)
      : API_PATH.PROJECT_REWARD_DETAIL(params?.rewardId, params?.projectId || ""),
    method: "GET",
    tags: ME_TAGS.rewarded_pending_invoice(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export default {
  useGetReward,
};
