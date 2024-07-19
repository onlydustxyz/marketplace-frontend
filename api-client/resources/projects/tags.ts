import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";
import { ProjectsGetAllQueryParams } from "api-client/resources/projects/types";

export default {
  get_all: (queryParams?: ProjectsGetAllQueryParams) => createTag(apiResources.projects, "get-all", null, queryParams),
  get_all_categories: () => createTag(apiResources.projects, "get-all-categories", null),
};
