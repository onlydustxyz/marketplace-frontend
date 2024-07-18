import {
  GetProjectBySlugPortParams,
  GetProjectBySlugPortResponse,
  GetProjectIssuesPortParams,
  GetProjectIssuesPortResponse,
  GetProjectRewardsPortParams,
  GetProjectRewardsPortResponse,
} from "core/domain/project/project-contract.types";

export interface ProjectFacadePort {
  getProjectBySlug(params: GetProjectBySlugPortParams): GetProjectBySlugPortResponse;
  getProjectRewards(params: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectPublicIssues(params: GetProjectIssuesPortParams): GetProjectIssuesPortResponse;
  getProjectRewards(params: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectPublicIssues(params: GetProjectIssuesPortParams): GetProjectIssuesPortResponse;
}
