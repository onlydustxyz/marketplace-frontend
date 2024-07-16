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
  mutationFn: (body?: Record<string, unknown>) => Promise<T>;
}

export function useMutationAdapter<T>({
  tag = "",
  request: mutationFn,
  options,
}: UseMutationAdapterParameters<T>): UseMutationAdapterReturn<T> {
  return {
    queryKey: [tag],
    mutationFn,
    ...options,
  };
}
