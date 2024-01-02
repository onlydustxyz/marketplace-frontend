import { BasePaginatedParams } from "actions/type.actions";

export interface LoadMoreProps<PARAMS extends BasePaginatedParams = BasePaginatedParams> {
  params: PARAMS;
  onFetchMore(params: PARAMS): Promise<JSX.Element>;
  hasMore: boolean;
}
