import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/committees/tags";
import { GetCommitteePublicResponse } from "api-client/resources/committees/types";

import adapters from "../adapters";

export function getPublicCommittee(committeeId: string): IFetchAdapater<GetCommitteePublicResponse> {
  return new FetchAdapter<GetCommitteePublicResponse>(adapters.get_public_committee_by_id)
    .setPathParams({ committee_id: committeeId })
    .setTag(tags.public_committee_by_id(committeeId));
}
