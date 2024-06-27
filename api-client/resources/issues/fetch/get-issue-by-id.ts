import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetIssueResponse, IssuePathParams } from "../types";

export function getIssueById({
  pathParams,
}: ParametersInterface<{
  PathParams: IssuePathParams;
}>): IFetchAdapater<GetIssueResponse> {
  const fetchAdapter = new FetchAdapter<GetIssueResponse>(adapters.get_by_id);

  if (pathParams) {
    fetchAdapter.setPathParams(pathParams).setTag(tags.by_id(pathParams.issueId.toString()));
  }

  return fetchAdapter;
}
