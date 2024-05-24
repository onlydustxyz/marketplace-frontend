import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import { UpdateMyCommitteeAssignmentParams } from "../types";

export function updateMyCommitteeAssignmentProject({
  committeeId,
  projectId,
}: UpdateMyCommitteeAssignmentParams): IFetchAdapater<unknown> {
  return new FetchAdapter<never>(adapters.updateMyCommitteeAssignmentProject).setPathParams({
    committeeId,
    projectId,
  });
}
