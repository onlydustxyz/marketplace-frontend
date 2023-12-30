import React, { createContext, useCallback, useState } from "react";
import { LoadMore } from "./components/LoadMore";

export type BaseInfiniteScrollResultData = Array<unknown>;
export interface BaseInfiniteScrollPagination {
  nextPageIndex: number;
  hasMore: boolean;
  totalItemNumber: number;
  totalPageNumber: number;
}

export interface BaseInfiniteScrollResultResult<RESULT extends BaseInfiniteScrollResultData>
  extends BaseInfiniteScrollPagination {
  data: RESULT;
}
interface InfiniteScrollContextProps<RESULT extends BaseInfiniteScrollResultData> extends BaseInfiniteScrollPagination {
  children: React.ReactNode;
  onFetchMore: (previousPagination: BaseInfiniteScrollPagination) => Promise<BaseInfiniteScrollResultResult<RESULT>>;
}

export interface InfiniteScrollReturn<RESULT extends BaseInfiniteScrollResultData>
  extends BaseInfiniteScrollPagination {
  result: RESULT;
  onFetchMore: () => Promise<void>;
}

export const InfiniteScrollContext = createContext<InfiniteScrollReturn<BaseInfiniteScrollResultData>>({
  result: [],
  onFetchMore: () => new Promise(() => null),
  nextPageIndex: 0,
  hasMore: false,
  totalItemNumber: 0,
  totalPageNumber: 0,
});

export function InfiniteScrollProvider<RESULT extends BaseInfiniteScrollResultData>({
  children,
  onFetchMore,
  nextPageIndex,
  hasMore,
  totalItemNumber,
  totalPageNumber,
}: InfiniteScrollContextProps<RESULT>) {
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
        nextPageIndex: nextPageIndexState,
        hasMore: hasMoreState,
        totalItemNumber: totalItemNumberState,
        totalPageNumber: totalPageNumberState,
      });
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
