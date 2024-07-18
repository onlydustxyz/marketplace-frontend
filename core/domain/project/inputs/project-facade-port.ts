import {
  GetProjectBySlugPathParams,
  GetProjectBySlugQueryParams,
  GetProjectBySlugResponse,
  GetProjectIssuesPathParams,
  GetProjectIssuesQueryParams,
  GetProjectRewardsPathParams,
  GetProjectRewardsQueryParams,
  GetProjectRewardsResponse,
} from "core/domain/project/project.types";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export interface ProjectFacadePort {
  getProjectBySlug(
    params: HttpClientParameters<{
      PathParams: GetProjectBySlugPathParams;
      QueryParams: GetProjectBySlugQueryParams;
    }>
  ): HttpStorageResponse<GetProjectBySlugResponse>;
  getProjectRewards(
    params: HttpClientParameters<{
      PathParams: GetProjectRewardsPathParams;
      QueryParams: GetProjectRewardsQueryParams;
    }>
  ): HttpStorageResponse<GetProjectRewardsResponse>;
  getProjectPublicIssues(
    params: HttpClientParameters<{
      PathParams: GetProjectIssuesPathParams;
      QueryParams: GetProjectIssuesQueryParams;
    }>
  ): HttpStorageResponse<GetProjectIssuesPortResponse>;
}
