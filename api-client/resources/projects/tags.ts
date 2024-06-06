import { apiResources } from "api-client/config/resources";
import { ProjectsPageQueryParams } from "api-client/resources/projects/types";

export default {
  all: (queryParams: ProjectsPageQueryParams) => `${apiResources.projects}-all-${JSON.stringify(queryParams)}`,
};
