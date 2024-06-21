import { QueryTags } from "src/api/query.type";

export interface ReactQueryOptions {
  enabled?: boolean;
  retry?: number;
  refetchInterval?: () => number;
  invalidatesTags?: { queryKey: QueryTags; exact?: boolean }[];
}
