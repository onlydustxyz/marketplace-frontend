import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/me/tags";
import { GetMyCommitteeAssignmentsResponse } from "api-client/resources/me/types";

import adapters from "../adapters";

export function getMyCommitteeAssignments(committeeId: string): IFetchAdapater<GetMyCommitteeAssignmentsResponse> {
  return new FetchAdapter<GetMyCommitteeAssignmentsResponse>(adapters.getMyCommitteeAssignments)
    .setPathParams({ committeeId })
    .setTag(tags.committee(committeeId));
}
