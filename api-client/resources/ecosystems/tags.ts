import { apiResources } from "api-client/config/resources";
import {
  EcosystemContributorsPathParams,
  EcosystemContributorsQueryParams,
  EcosystemDetailsPathParams,
  EcosystemProjectsPathParams,
  EcosystemProjectsQueryParams,
  EcosystemsQueryParams,
} from "api-client/resources/ecosystems/types";

export default {
  root: `${apiResources.ecosystems}-root`,
  by_slug: (pathParams: EcosystemDetailsPathParams) => `${apiResources.ecosystems}-slug-${JSON.stringify(pathParams)}`,
  projects_by_slug: (pathParams: EcosystemProjectsPathParams, queryParams: EcosystemProjectsQueryParams) =>
    `${apiResources.ecosystems}-projects-by-slug-${JSON.stringify(pathParams)}-${JSON.stringify(queryParams)}`,
  contributors_by_slug: (pathParams: EcosystemContributorsPathParams, queryParams: EcosystemContributorsQueryParams) =>
    `${apiResources.ecosystems}-contributors-by-slug-${JSON.stringify(pathParams)}-${JSON.stringify(queryParams)}`,
  get_all: (queryParams: EcosystemsQueryParams) => `${apiResources.ecosystems}-list-${JSON.stringify(queryParams)}`,
};
