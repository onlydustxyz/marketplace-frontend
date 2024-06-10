import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";
import tags from "../tags";
import { GetRecommendedProjectsPageResponse } from "../types";

export function getMyRecommendedProjects({
  pagination,
}: ParametersInterface<object>): IFetchAdapater<GetRecommendedProjectsPageResponse> {
  const fetchAdapter = new FetchAdapter<GetRecommendedProjectsPageResponse>(
    adapters.get_my_recommended_projects
  ).setTag(tags.recommended_projects());

  return PaginationAdapter(fetchAdapter, pagination).fetcher;
}
