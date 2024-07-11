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

interface useInfiniteQueryAdapterInterface<T extends BaseResponse> extends Partial<ReactQueryOptions> {
  queryKey: string[];
  queryFn(p: { pageParam: unknown }): Promise<T>;
  initialPageParam: number;
  getNextPageParam(p: BaseResponse): number | undefined;
}

// interface useInfiniteQueryAdapterParameters<T extends BaseResponse> {
//   tag?: string;
//   request: (p: { pageIndex: number }) => Promise<T>;
//   options?: Partial<ReactQueryOptions>;
// }

function useInfiniteQueryAdapter<T extends GenericFunction = GenericFunction>({
  pathParams,
  queryParams,
  options,
  initFn,
}: ReactQueryInfiniteParameters<T> & { initFn: T }) {
  function defaultRequest(pageIndex = 0) {
    return initFn({
      pathParams,
      queryParams: { ...queryParams, pageIndex, pageSize: 15 },
    });
  }

  const { tag } = defaultRequest();

  return {
    queryKey: [tag],
    queryFn: ({ pageParam: pageIndex = 0 }) => defaultRequest(pageIndex as number).request(),
    initialPageParam: 0,
    getNextPageParam: (lastPage: BaseResponse) => (lastPage?.hasMore ? lastPage.nextPageIndex : undefined),
    ...options,
  };
}

export type { useInfiniteQueryAdapterInterface };
export { useInfiniteQueryAdapter };
