import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useInfiniteRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { QueryParams } from "src/utils/getEndpointUrl";

interface useInfiniteMyRewardListProps {
  queryParams?: QueryParams;
}

export default function useInfiniteMyRewardList({ queryParams }: useInfiniteMyRewardListProps) {
  return useInfiniteRestfulData<components["schemas"]["MyRewardsPageResponse"]>(
    {
      resourcePath: ApiResourcePaths.GET_MY_REWARDS,
      pageSize: 10,
      queryParams,
    },
    { queryKey: ["myRewards", queryParams] }
  );
}
