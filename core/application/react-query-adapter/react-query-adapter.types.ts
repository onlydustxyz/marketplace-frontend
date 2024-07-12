import { FirstParameter, GenericFunction } from "core/helpers/types";

export interface ReactQueryOptions {
  enabled: boolean;
  retry: number;
  refetchInterval: () => number;
  refetchOnWindowFocus: () => boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitPagination<T extends { queryParams?: any }> = Omit<T, "queryParams"> & {
  queryParams?: Omit<T["queryParams"], "pageIndex" | "pageSize">;
};

export type ReactQueryParameters<T extends GenericFunction> = FirstParameter<T> & {
  options?: Partial<ReactQueryOptions>;
};

export type ReactQueryInfiniteParameters<T extends GenericFunction> = OmitPagination<ReactQueryParameters<T>>;
