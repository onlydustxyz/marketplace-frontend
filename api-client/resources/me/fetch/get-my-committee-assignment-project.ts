import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { GetMyCommitteeAssignmentResponse } from "../types";

export function getMyCommitteeAssignmentProject(
  committeeId: string,
  projectId: string
): IFetchAdapater<GetMyCommitteeAssignmentResponse> {
  return new FetchAdapter<GetMyCommitteeAssignmentResponse>(adapters.get_my_committee_assignment_project)
    .setPathParams({ committeeId, projectId })
    .setTag(tags.committee_project(committeeId, projectId));
}
