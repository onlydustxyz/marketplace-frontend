import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useInfiniteRestfulData } from "src/hooks/useRestfulData/useRestfulData";

type QueryParam = {
  key: string;
  value: Array<string | number | boolean>;
};

interface useInfiniteMyRewardListProps {
  queryParams?: QueryParam[];
}

export default function useInfiniteMyRewardList({ queryParams }: useInfiniteMyRewardListProps) {
  return useInfiniteRestfulData<components["schemas"]["MyRewardsPageResponse"]>(
    {
      resourcePath: ApiResourcePaths.GET_MY_REWARDS,
      pageSize: 5,
      queryParams,
    },
    { queryKey: ["myRewards", queryParams] }
  );
}
