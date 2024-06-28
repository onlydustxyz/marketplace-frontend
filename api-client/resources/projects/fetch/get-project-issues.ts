import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetProjectIssuesPageResponse, ProjectsGetIssuesPathParams, ProjectsGetIssuesQueryParams } from "../types";

export function getProjectIssues({
  pathParams,
  queryParams,
  pagination,
}: ParametersInterface<{
  PathParams: ProjectsGetIssuesPathParams;
  QueryParams: ProjectsGetIssuesQueryParams;
}>): IFetchAdapater<GetProjectIssuesPageResponse> {
  const fetchAdapter = new FetchAdapter<GetProjectIssuesPageResponse>(adapters.get_project_issues);

  if (pathParams && queryParams) {
    fetchAdapter
      .setPathParams(pathParams)
      .setParams(queryParams)
      .setTag(tags.get_project_issues({ pathParams, queryParams }));
  }

  return PaginationAdapter(fetchAdapter, pagination).fetcher;
}
