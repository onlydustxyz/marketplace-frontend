import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import { ProjectApplicationUpdatePathParams } from "../types";

export function updateMyApplication({
  pathParams,
}: {
  pathParams: ProjectApplicationUpdatePathParams;
}): IFetchAdapater<unknown> {
  return new FetchAdapter<never>(adapters.update_my_application).setPathParams(pathParams);
}
