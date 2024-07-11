import { ReactQueryOptions } from "core/application/react-query-adapter/react-query-adapter.types";
import { HttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

type UseQueryAdapterParameters<T> = HttpStorageResponse<T> & {
  options?: Partial<ReactQueryOptions>;
};

interface UseQueryAdapterInterface<T> extends Partial<ReactQueryOptions> {
  queryKey: string[];
  queryFn: () => Promise<T>;
}

function useQueryAdapter<T>({
  tag = "",
  request: queryFn,
  options,
}: UseQueryAdapterParameters<T>): UseQueryAdapterInterface<T> {
  return {
    queryKey: [tag],
    queryFn,
    ...options,
  };
}

export type { UseQueryAdapterInterface };
export { useQueryAdapter };
