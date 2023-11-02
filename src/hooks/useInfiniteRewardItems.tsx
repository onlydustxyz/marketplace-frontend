import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useInfiniteRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { QueryParams } from "src/utils/getEndpointUrl";

type Props = {
  rewardId: string;
  queryParams?: QueryParams;
  enabled?: boolean;
};

type ProjectProps = {
  projectId: string;
  isMine?: never;
} & Props;

type MyProps = {
  projectId?: never;
  isMine: true;
} & Props;

export default function useInfiniteRewardItems({
  projectId,
  rewardId,
  queryParams,
  enabled,
  isMine,
}: ProjectProps | MyProps) {
  const queryKey = isMine
    ? ["my-reward-items", rewardId, queryParams]
    : ["project-reward-items", projectId, rewardId, queryParams];
  const resourcePath = isMine ? ApiResourcePaths.GET_MY_REWARD_ITEMS_BY_ID : ApiResourcePaths.GET_PROJECT_REWARD_ITEMS;
  const pathParam = isMine ? rewardId : { projectId, rewardId };

  return useInfiniteRestfulData<components["schemas"]["RewardItemsPageResponse"]>(
    {
      resourcePath,
      pathParam,
      queryParams,
    },
    { queryKey, enabled }
  );
}
