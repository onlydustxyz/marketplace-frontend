import { ReactQueryOptions } from "core/application/react-query-adapter/react-query-adapter.types";
import { HttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

type UseQueryAdapterParameters<T> = HttpStorageResponse<T> & {
  options?: Partial<ReactQueryOptions>;
};

interface UseQueryAdapterReturn<T> extends Partial<ReactQueryOptions> {
  queryKey: string[];
  queryFn: () => Promise<T>;
}

export function useQueryAdapter<T>({
  tag = "",
  request: queryFn,
  options,
}: UseQueryAdapterParameters<T>): UseQueryAdapterReturn<T> {
  return {
    queryKey: [tag],
    queryFn,
    ...options,
  };
}
