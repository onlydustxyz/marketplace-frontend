"use client";

import React, { createContext, useCallback, useState } from "react";
import { LoadMore } from "./components/LoadMore";
import { BasePaginatedParams } from "../type.actions.ts";
import { InfiniteScrollContextProps, InfiniteScrollReturn } from "./infinite-scroll.context.type.ts";

export const InfiniteScrollContext = createContext<InfiniteScrollReturn>({
  result: [],
  onFetchMore: () => new Promise(() => null),
  nextPageIndex: 0,
  hasMore: false,
});

export function InfiniteScrollProvider<PARAMS extends BasePaginatedParams>({
  children,
  pageSize,
  onFetchMore,
  nextPageIndex,
  hasMore,
}: InfiniteScrollContextProps<PARAMS>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<JSX.Element[]>([]);
  const [nextPageIndexState, setNextPageIndexState] = useState<number>(nextPageIndex);
  const [hasMoreState, setHasMoreState] = useState<boolean>(hasMore);

  const handleFetchMore = useCallback(async () => {
    if (!loading && hasMoreState) {
      setLoading(true);
      const newResult = await onFetchMore({
        pageIndex: nextPageIndexState + 1,
        pageSize,
      } as PARAMS);
      console.log("newResult.element", newResult);
      setResult(oldResult => [...oldResult, ...newResult.element]);
      setNextPageIndexState(newResult.pagination.nextPageIndex);
      setHasMoreState(newResult.pagination.hasMore);
      setLoading(false);
    }
  }, [result]);

  console.log("result", result);

  return (
    <InfiniteScrollContext.Provider
      value={{
        result,
        onFetchMore: handleFetchMore,
        nextPageIndex: nextPageIndexState,
        hasMore: hasMoreState,
      }}
    >
      {children}
      {hasMoreState && <LoadMore onLoadMore={handleFetchMore} loading={loading} />}
    </InfiniteScrollContext.Provider>
  );
}
