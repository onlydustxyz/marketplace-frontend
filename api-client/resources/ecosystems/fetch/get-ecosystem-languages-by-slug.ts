import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationAdapter } from "api-client/adapter/pagination/pagination-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";

import adapters from "../adapters";
import tags from "../tags";
import {
  EcosystemLanguagesPathParams,
  EcosystemLanguagesQueryParams,
  GetEcosystemLanguagesPageResponse,
} from "../types";

export function getEcosystemLanguagesBySlug(
  pathParams: EcosystemLanguagesPathParams,
  queryParams: EcosystemLanguagesQueryParams,
  pagination?: PaginationInterface
): IFetchAdapater<GetEcosystemLanguagesPageResponse> {
  const fetcher = new FetchAdapter<GetEcosystemLanguagesPageResponse>(adapters.get_languages_by_slug)
    .setPathParams(pathParams)
    .setParams(queryParams)
    .setTag(tags.languages_by_slug(pathParams, queryParams));

  return PaginationAdapter(fetcher, pagination).fetcher;
}
