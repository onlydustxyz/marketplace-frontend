import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { GetMyJourneyResponse } from "../types";

export function getMyJourney(): IFetchAdapater<GetMyJourneyResponse> {
  return new FetchAdapter<GetMyJourneyResponse>(adapters.get_my_journey).setTag(tags.my_journey());
}
