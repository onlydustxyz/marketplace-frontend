import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { UpdateCommitteeProjectApplicationParams } from "api-client/resources/committees/types";

import adapters from "../adapters";

export function updateCommitteeProjectApplication({
  committeeId,
  projectId,
}: UpdateCommitteeProjectApplicationParams): IFetchAdapater<unknown> {
  return new FetchAdapter<never>(adapters.update_project_application).setPathParams({
    committee_id: committeeId,
    project_id: projectId,
  });
}
