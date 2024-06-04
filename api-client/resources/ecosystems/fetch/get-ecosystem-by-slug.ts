import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { EcosystemDetailsPathParams, GetEcosystemDetailsResponse } from "../types";

export function getEcosystemBySlug(
  pathParams: EcosystemDetailsPathParams
): IFetchAdapater<GetEcosystemDetailsResponse> {
  return new FetchAdapter<GetEcosystemDetailsResponse>(adapters.get_by_slug)
    .setPathParams(pathParams)
    .setTag(tags.by_slug(pathParams));
}
