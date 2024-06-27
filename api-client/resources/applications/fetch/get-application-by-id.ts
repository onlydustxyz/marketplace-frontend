import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";
import tags from "../tags";
import { ApplicationPathParams, GetApplicationResponse } from "../types";

export function getApplicationById({
  pathParams,
}: ParametersInterface<{
  PathParams: ApplicationPathParams;
}>): IFetchAdapater<GetApplicationResponse> {
  const fetchAdapter = new FetchAdapter<GetApplicationResponse>(adapters.get_by_id);

  if (pathParams) {
    fetchAdapter.setPathParams(pathParams).setTag(tags.by_id(pathParams.applicationId));
  }

  return fetchAdapter;
}
