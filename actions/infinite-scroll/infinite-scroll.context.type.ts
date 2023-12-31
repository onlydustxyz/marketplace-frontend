"use client";

import React from "react";
import { BasePaginatedParams } from "../type.actions.ts";

// Define the type for the data that will be fetched and displayed in the infinite scroll
export type BaseInfiniteScrollResultData = Array<unknown>;

// Define the pagination information required for infinite scrolling
export interface BaseInfiniteScrollPagination {
  nextPageIndex: number; // Index of the next page to be fetched
  hasMore: boolean; // Indicates whether there are more items to fetch
  totalItemNumber: number; // Total number of items available in the dataset
  totalPageNumber: number; // Total number of pages based on the page size
}

// Combine the result data with the pagination information
export interface BaseInfiniteScrollResultResult<RESULT extends BaseInfiniteScrollResultData>
  extends BaseInfiniteScrollPagination {
  data: RESULT; // The actual data fetched for the current page
}

// Define the props for the InfiniteScrollContext
export interface InfiniteScrollContextProps<
  RESULT extends BaseInfiniteScrollResultData,
  PARAMS extends BasePaginatedParams
> extends BaseInfiniteScrollPagination {
  children: React.ReactNode; // Children components to be rendered within the context
  pageSize: number; // Number of items to fetch per page
  onFetchMore: (previousPagination: PARAMS) => Promise<BaseInfiniteScrollResultResult<RESULT>>;
  // Function to fetch more data based on the previous pagination information
}

// Define the return type for the InfiniteScrollContext
export interface InfiniteScrollReturn<RESULT extends BaseInfiniteScrollResultData>
  extends BaseInfiniteScrollPagination {
  result: RESULT; // Current result data to be displayed
  onFetchMore: () => Promise<void>; // Function to fetch more data for the next page
}
