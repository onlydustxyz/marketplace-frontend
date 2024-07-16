import {
  ReactQueryMutationOptions,
  ReactQueryOptions,
} from "core/application/react-query-adapter/react-query-adapter.types";
import { HttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

type UseMutationAdapterParameters<T> = HttpStorageResponse<T> & {
  options?: Partial<ReactQueryMutationOptions>;
};

interface UseMutationAdapterReturn<T> extends Partial<ReactQueryOptions> {
  queryKey: string[];
  queryFn: () => Promise<T>;
}

export function useMutationAdapter<T>({
  tag = "",
  request: queryFn,
  options,
}: UseMutationAdapterParameters<T>): UseMutationAdapterReturn<T> {
  return {
    queryKey: [tag],
    queryFn,
    ...options,
  };
}
