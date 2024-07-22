import {
  ReactQueryInfiniteParameters,
  ReactQueryOptions,
} from "core/application/react-query-adapter/react-query-adapter.types";
import { GenericFunction } from "core/helpers/types";

interface BaseResponse {
  hasMore: boolean;
  totalPageNumber: number;
  totalItemNumber: number;
  nextPageIndex: number;
}

type UseInfiniteQueryAdapterParameters<T extends GenericFunction = GenericFunction> =
  ReactQueryInfiniteParameters<T> & { httpStorage: T };

interface UseInfiniteQueryAdapterReturn<T extends BaseResponse> extends Partial<ReactQueryOptions> {
  queryKey: string[];
  queryFn(p: { pageParam: unknown }): Promise<T>;
  initialPageParam: number;
  getNextPageParam(p: BaseResponse): number | undefined;
}

// TODO: Change queryParams types with pageSize
export function useInfiniteQueryAdapter<R extends BaseResponse, T extends GenericFunction = GenericFunction>({
  pathParams,
  queryParams,
  options,
  httpStorage,
}: UseInfiniteQueryAdapterParameters<T>): UseInfiniteQueryAdapterReturn<R> {
  function _httpStorage(pageIndex = 0) {
    return httpStorage({
      pathParams,
      queryParams: { pageSize: 15, ...queryParams, pageIndex },
    });
  }

  const { tag } = _httpStorage();

  return {
    queryKey: [tag],
    queryFn: ({ pageParam: pageIndex = 0 }) => _httpStorage(pageIndex as number).request(),
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
    ...options,
  };
}
