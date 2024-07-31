import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import adapters from "../adapters";
import tags from "../tags";
import { GetMyOnboardingResponse } from "../types";

export function getMyOnboarding(): IFetchAdapater<GetMyOnboardingResponse> {
  return new FetchAdapter<GetMyOnboardingResponse>(adapters.get_my_onboarding).setTag(tags.my_onboarding());
}
