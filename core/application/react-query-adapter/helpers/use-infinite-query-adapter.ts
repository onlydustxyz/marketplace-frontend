import { useInfiniteQuery } from "@tanstack/react-query";
import { AnyType, FirstParameter, GenericFunction } from "core/helpers/types";

interface BaseResponse {
  hasMore: boolean;
  totalPageNumber: number;
  totalItemNumber: number;
  nextPageIndex: number;
}

type UseInfiniteQueryOptions<Response> = FirstParameter<typeof useInfiniteQuery<Response>>;

type UseInfiniteQueryFacadeParamsPaginated<Params extends GenericFunction, Response> = FirstParameter<Params> & {
  options?: Omit<UseInfiniteQueryOptions<Response>, "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam">;
};

type OmitPagination<Params extends { queryParams?: AnyType }> = Omit<Params, "queryParams"> & {
  queryParams?: Omit<Params["queryParams"], "pageIndex">;
};

export type UseInfiniteQueryFacadeParams<Params extends GenericFunction, Response> = OmitPagination<
  UseInfiniteQueryFacadeParamsPaginated<Params, Response>
>;

type UseInfiniteQueryAdapterParams<Params extends GenericFunction, Response> = UseInfiniteQueryFacadeParams<
  Params,
  Response
> & {
  httpStorage: Params;
};

export function useInfiniteQueryAdapter<Params extends GenericFunction, Response extends BaseResponse>({
  pathParams,
  queryParams,
  options,
  httpStorage,
}: UseInfiniteQueryAdapterParams<Params, Response>): UseInfiniteQueryOptions<Response> {
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
