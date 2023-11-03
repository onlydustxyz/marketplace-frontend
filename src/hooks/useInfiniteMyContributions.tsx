import { components } from "src/__generated/api";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useInfiniteRestfulData } from "src/hooks/useRestfulData/useRestfulData";

type Response = components["schemas"]["ContributionPageResponse"];
type UseInfiniteRestfulDataParameters = Parameters<typeof useInfiniteRestfulData<Response>>;

export default function useInfiniteMyContributions(
  apiOptions: Omit<UseInfiniteRestfulDataParameters[0], "resourcePath">,
  queryOptions: Omit<UseInfiniteRestfulDataParameters[1], "queryKey">
) {
  const { queryParams } = apiOptions;

  return useInfiniteRestfulData<Response>(
    { resourcePath: ApiResourcePaths.MY_CONTRIBUTIONS, ...apiOptions },
    { queryKey: ["my-contributions", queryParams], ...queryOptions }
  );
}
