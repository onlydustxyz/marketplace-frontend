import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";
import { ProjectApplicationUpdatePathParams } from "../types";

export function updateMyApplication({
  pathParams,
}: ParametersInterface<{
  PathParams: ProjectApplicationUpdatePathParams;
}>): IFetchAdapater<unknown> {
  const fetchAdapter = new FetchAdapter<never>(adapters.update_my_application);

  if (pathParams) {
    fetchAdapter.setPathParams(pathParams);
  }

  return fetchAdapter;
}
