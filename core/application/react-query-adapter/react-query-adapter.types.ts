import { FirstParameter, GenericFunction } from "core/helpers/types";
import { HttpClientParameters } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export interface ReactQueryOptions {
  enabled: boolean;
  retry: number;
  refetchInterval: () => number;
  refetchOnWindowFocus: () => boolean;
}

export type ReactQueryParameters<T extends GenericFunction> = FirstParameter<T> & {
  options?: Partial<ReactQueryOptions>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitPagination<T extends { queryParams?: any }> = Omit<T, "queryParams"> & {
  queryParams?: Omit<T["queryParams"], "pageIndex" | "pageSize">;
};

export type ReactQueryInfiniteParameters<T extends GenericFunction> = OmitPagination<ReactQueryParameters<T>>;

export interface ReactQueryMutationOptions {
  onSuccess: () => void;
}

export type ReactQueryMutationParameters<
  T extends GenericFunction,
  I extends Record<string, HttpClientParameters<object>> | undefined = undefined
> = FirstParameter<T> & {
  options?: Partial<ReactQueryMutationOptions>;
  invalidateTagParams?: I;
};
