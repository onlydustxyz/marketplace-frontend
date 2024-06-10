export interface ReactQueryOptions {
  enabled?: boolean;
  pageSize?: string;
  pageIndex?: string;
  retry?: number;
  refetchInterval?: () => number;
}
