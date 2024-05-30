import { apiResources } from "api-client/config/resources";
import { EcosystemProjectPathParams, EcosystemProjectQueryParams } from "api-client/resources/ecosystems/types";

export default {
  root: `${apiResources.ecosystems}-root`,
  projects_by_slug: (pathParams: EcosystemProjectPathParams, queryParams: EcosystemProjectQueryParams) =>
    `${apiResources.ecosystems}-projects-by-slug-${JSON.stringify(pathParams)}-${JSON.stringify(queryParams)}`,
};
