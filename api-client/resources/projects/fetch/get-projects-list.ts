import { ListProjectsParameters, ListProjectsResponse } from "api-client/resources/projects/types";

import adapters from "../adapters";

export async function getProjectsList(params: ListProjectsParameters): Promise<ListProjectsResponse> {
  return adapters.root().get<ListProjectsResponse>({
    params,
  });
}
