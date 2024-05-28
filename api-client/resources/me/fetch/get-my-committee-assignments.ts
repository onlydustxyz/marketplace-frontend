import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { GetMyCommitteeAssignmentsResponse } from "../types";

export function getMyCommitteeAssignments(committeeId: string): IFetchAdapater<GetMyCommitteeAssignmentsResponse> {
  return new FetchAdapter<GetMyCommitteeAssignmentsResponse>(adapters.getMyCommitteeAssignments)
    .setPathParams({ committeeId })
    .setTag(tags.committee(committeeId));
}
