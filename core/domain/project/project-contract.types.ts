import { ListIssueInterface } from "core/domain/issue/models/list-issue-model";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components, operations } from "src/__generated/api";

/* --------------------------------- Get project by slug -------------------------------- */

type GetProjectBySlugPathParams = operations["getProjectBySlug"]["parameters"]["path"];
type GetProjectBySlugQueryParams = operations["getProjectBySlug"]["parameters"]["query"];

export type GetProjectBySlugResponse = components["schemas"]["ProjectResponse"];
export type GetProjectBySlugPortResponse = HttpStorageResponse<GetProjectBySlugResponse>;
export type GetProjectBySlugPortParams = HttpClientParameters<{
  PathParams: GetProjectBySlugPathParams;
  QueryParams: GetProjectBySlugQueryParams;
}>;
/* --------------------------------- Get project rewards -------------------------------- */

type GetProjectRewardsPathParams = operations["getProjectRewards"]["parameters"]["path"];
type GetProjectRewardsQueryParams = operations["getProjectRewards"]["parameters"]["query"];
export type GetProjectRewardsResponse = components["schemas"]["RewardsPageResponse"];

export type GetProjectRewardsPortResponse = HttpStorageResponse<GetProjectRewardsResponse>;
export type GetProjectRewardsPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardsPathParams;
  QueryParams: GetProjectRewardsQueryParams;
}>;

/* --------------------------------- Get project public issues -------------------------------- */

type GetProjectIssuesPathParams = operations["getProjectPublicIssues"]["parameters"]["path"];
export type GetProjectIssuesQueryParams = operations["getProjectPublicIssues"]["parameters"]["query"];

export type GetProjectIssuesResponse = components["schemas"]["GithubIssuePageResponse"];

export type GetProjectIssuesModel = Omit<GetProjectIssuesResponse, "issues"> & {
  issues: ListIssueInterface[];
};

export type GetProjectIssuesPortResponse = HttpStorageResponse<GetProjectIssuesModel>;

export type GetProjectIssuesPortParams = HttpClientParameters<{
  PathParams: GetProjectIssuesPathParams;
  QueryParams: GetProjectIssuesQueryParams;
}>;
