"use client";

import React, { createContext, useCallback, useState } from "react";
import { LoadMore } from "./components/LoadMore";
import { BasePaginatedParams } from "../type.actions.ts";
import {
  BaseInfiniteScrollResultData,
  InfiniteScrollContextProps,
  InfiniteScrollReturn,
} from "./infinite-scroll.context.type.ts";

export const InfiniteScrollContext = createContext<InfiniteScrollReturn<BaseInfiniteScrollResultData>>({
  result: [],
  onFetchMore: () => new Promise(() => null),
  nextPageIndex: 0,
  hasMore: false,
  totalItemNumber: 0,
  totalPageNumber: 0,
});

export function InfiniteScrollProvider<
  RESULT extends BaseInfiniteScrollResultData,
  PARAMS extends BasePaginatedParams
>({
  children,
  pageSize,
  onFetchMore,
  nextPageIndex,
  hasMore,
  totalItemNumber,
  totalPageNumber,
}: InfiniteScrollContextProps<RESULT, PARAMS>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<BaseInfiniteScrollResultData>([]);
  const [nextPageIndexState, setNextPageIndexState] = useState<number>(nextPageIndex);
  const [hasMoreState, setHasMoreState] = useState<boolean>(hasMore);
  const [totalItemNumberState, setTotalItemNumberState] = useState<number>(totalItemNumber);
  const [totalPageNumberState, setTotalPageNumberState] = useState<number>(totalPageNumber);

  const handleFetchMore = useCallback(async () => {
    if (!loading && hasMoreState) {
      setLoading(true);
      const newResult = await onFetchMore({
        pageIndex: nextPageIndexState + 1,
        pageSize,
      } as PARAMS);
      setResult(oldResult => [...oldResult, ...newResult.data]);
      setNextPageIndexState(newResult.nextPageIndex);
      setHasMoreState(newResult.hasMore);
      setTotalItemNumberState(newResult.totalItemNumber);
      setTotalPageNumberState(newResult.totalPageNumber);
      setLoading(false);
    }
  }, [result]);

  return (
    <InfiniteScrollContext.Provider
      value={{
        result: result as RESULT,
        onFetchMore: handleFetchMore,
        nextPageIndex: nextPageIndexState,
        hasMore: hasMoreState,
        totalItemNumber: totalItemNumberState,
        totalPageNumber: totalPageNumberState,
      }}
    >
      {children}
      {hasMoreState && <LoadMore onLoadMore={handleFetchMore} loading={loading} />}
    </InfiniteScrollContext.Provider>
  );
}
