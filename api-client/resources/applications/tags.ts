import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";

import { ApplicationsGetAllQueryParams } from "./types";

export default {
  get_all: (queryParams?: ApplicationsGetAllQueryParams) =>
    createTag(apiResources.applications, "get-all", null, queryParams),
  by_id: (id: string) => createTag(apiResources.applications, "by-id", { id }),
};
