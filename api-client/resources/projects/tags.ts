import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";
import {
  ProjectsGetAllQueryParams,
  ProjectsGetIssuesPathParams,
  ProjectsGetIssuesQueryParams,
} from "api-client/resources/projects/types";

export default {
  get_all: (queryParams?: ProjectsGetAllQueryParams) => createTag(apiResources.projects, "get-all", null, queryParams),
  get_all_categories: () => createTag(apiResources.projects, "get-all-categories", null),
  get_project_issues: ({
    pathParams,
    queryParams,
  }: {
    pathParams: ProjectsGetIssuesPathParams;
    queryParams: ProjectsGetIssuesQueryParams;
  }) => createTag(apiResources.projects, "get-project-issues", pathParams, queryParams),
};
