export interface ReactQueryOptions {
  enabled?: boolean;
  retry?: number;
  refetchInterval?: () => number;
  refetchOnWindowFocus?: () => boolean;
}
