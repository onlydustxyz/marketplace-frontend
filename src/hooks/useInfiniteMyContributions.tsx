import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useInfiniteRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { QueryParams } from "src/utils/getEndpointUrl";

export default function useInfiniteMyContributions({ queryParams }: { queryParams?: QueryParams }) {
  return useInfiniteRestfulData<components["schemas"]["ContributionPageResponse"]>(
    {
      resourcePath: ApiResourcePaths.MY_CONTRIBUTIONS,
      pageSize: 10,
      queryParams,
    },
    { queryKey: ["my-contributions", queryParams] }
  );
}
