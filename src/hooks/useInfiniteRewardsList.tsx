import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useInfiniteRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { QueryParam } from "src/utils/getEndpointUrl";

export type RewardPageItemType = components["schemas"]["RewardPageItemResponse"];

interface useInfiniteRewardsListProps {
  projectId: string;
  queryParams?: QueryParam[];
  enabled?: boolean;
}

export default function useInfiniteRewardsList({ projectId, queryParams }: useInfiniteRewardsListProps) {
  return useInfiniteRestfulData<components["schemas"]["RewardsPageResponse"]>(
    {
      resourcePath: ApiResourcePaths.PROJECT_REWARDS,
      pageSize: 10,
      pathParam: projectId,
      queryParams,
    },
    { queryKey: ["reward-list", queryParams] }
  );
}
