import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import {
  EcosystemContributorsPathParams,
  EcosystemContributorsQueryParams,
  GetEcosystemContributorsPageResponse,
} from "../types";

export function getEcosystemContributorsBySlug(
  pathParams: EcosystemContributorsPathParams,
  queryParams: EcosystemContributorsQueryParams
): IFetchAdapater<GetEcosystemContributorsPageResponse> {
  return new FetchAdapter<GetEcosystemContributorsPageResponse>(adapters.get_contributors_by_slug)
    .setPathParams(pathParams)
    .setParams(queryParams)
    .setTag(tags.contributors_by_slug(pathParams, queryParams));
}
