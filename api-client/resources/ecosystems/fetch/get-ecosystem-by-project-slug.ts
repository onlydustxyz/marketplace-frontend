import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { GetEcosystemProjectPageResponse } from "../types";

export function getEcosystemByProjectSlug({
  ecosystemSlug,
  queryParams,
}: {
  ecosystemSlug: string;
  queryParams?: Record<string, string>;
}): IFetchAdapater<GetEcosystemProjectPageResponse> {
  const fetchAdapter = new FetchAdapter<GetEcosystemProjectPageResponse>(adapters.get_projects_by_slug)
    .setPathParams({ ecosystemSlug })
    .setTag(tags.projects_by_slug(ecosystemSlug));

  if (queryParams) {
    fetchAdapter.setParams(queryParams).setTag(tags.projects_by_slug(ecosystemSlug, queryParams));
  }

  return fetchAdapter;
}
