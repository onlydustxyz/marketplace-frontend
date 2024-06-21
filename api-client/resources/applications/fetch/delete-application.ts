import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { ProjectApplicationPathParams } from "api-client/resources/applications/types";
import { ParametersInterface } from "api-client/types/parameters-interface";

import adapters from "../adapters";

export function deleteApplication({
  pathParams,
}: ParametersInterface<{
  PathParams: ProjectApplicationPathParams;
}>): IFetchAdapater<never> {
  const fetchAdapter = new FetchAdapter<never>(adapters.delete_application);

  if (pathParams) {
    fetchAdapter.setPathParams(pathParams);
  }

  return fetchAdapter;
}
