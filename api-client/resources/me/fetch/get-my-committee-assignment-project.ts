import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/me/tags";
import { GetMyCommitteeAssignmentResponse } from "api-client/resources/me/types";

import adapters from "../adapters";

export function getMyCommitteeAssignmentProject(
  committeeId: string,
  projectId: string
): IFetchAdapater<GetMyCommitteeAssignmentResponse> {
  return new FetchAdapter<GetMyCommitteeAssignmentResponse>(adapters.getMyCommitteeAssignmentProject)
    .setPathParams({ committeeId, projectId })
    .setTag(tags.committeeProject(committeeId, projectId));
}
