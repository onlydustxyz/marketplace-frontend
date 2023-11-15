import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useInfiniteRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { QueryParams } from "src/utils/getEndpointUrl";

interface UseInfiniteContributorsProps {
  projectId: string;
  queryParams?: QueryParams;
}

export default function useInfiniteContributorList({ projectId, queryParams }: UseInfiniteContributorsProps) {
  return useInfiniteRestfulData<components["schemas"]["ContributorsPageResponse"]>(
    {
      resourcePath: ApiResourcePaths.GET_PROJECT_CONTRIBUTORS,
      pageSize: 20,
      pathParam: projectId,
      queryParams,
    },
    { queryKey: ["contributors", projectId, queryParams] }
  );
}
