import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/committees/tags";
import { GetCommitteeProjectApplicationResponse } from "api-client/resources/committees/types";

import adapters from "../adapters";

export function getCommitteeProjectApplication({
  committeeId,
  projectId = "",
}: {
  committeeId: string;
  projectId?: string;
}): IFetchAdapater<GetCommitteeProjectApplicationResponse> {
  const fetchAdapter = new FetchAdapter<GetCommitteeProjectApplicationResponse>(adapters.project_application)
    .setPathParams({ committee_id: committeeId })
    .setTag(tags.project_application(committeeId));

  if (projectId) {
    fetchAdapter.setParams({ projectId }).setTag(tags.project_application(committeeId, projectId));
  }

  return fetchAdapter;
}
