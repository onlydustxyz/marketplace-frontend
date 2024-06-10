export interface ReactQueryOptions {
  enabled?: boolean;
  pageSize?: string;
  retry?: number;
  refetchInterval?: () => number;
}
