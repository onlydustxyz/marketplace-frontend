import { ListIssueInterface } from "core/domain/issue/models/list-issue-model";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components, operations } from "src/__generated/api";

/* --------------------------------- Get project by slug -------------------------------- */

export type GetProjectBySlugPathParams = operations["getProjectBySlug"]["parameters"]["path"];
export type GetProjectBySlugQueryParams = operations["getProjectBySlug"]["parameters"]["query"];
export type GetProjectBySlugResponse = components["schemas"]["ProjectResponse"];

/* --------------------------------- Get project rewards -------------------------------- */

export type GetProjectRewardsPathParams = operations["getProjectRewards"]["parameters"]["path"];
export type GetProjectRewardsQueryParams = operations["getProjectRewards"]["parameters"]["query"];
export type GetProjectRewardsResponse = components["schemas"]["RewardsPageResponse"];

/* --------------------------------- Get project public issues -------------------------------- */

export type GetProjectIssuesPathParams = operations["getProjectPublicIssues"]["parameters"]["path"];
export type GetProjectIssuesQueryParams = operations["getProjectPublicIssues"]["parameters"]["query"];
export type GetProjectIssuesResponse = components["schemas"]["ProjectIssuesPageResponse"];

export type GetProjectIssuesPortResponse = HttpStorageResponse<
  Omit<GetProjectIssuesResponse, "issue"> & {
    issues: ListIssueInterface[];
  }
>;

export type GetProjectIssuesPortParams = HttpClientParameters<{
  PathParams: GetProjectIssuesPathParams;
  QueryParams: GetProjectIssuesQueryParams;
}>;
