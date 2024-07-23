import {
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectBySlugPortParams,
  GetProjectBySlugPortResponse,
  GetProjectIssuesPortParams,
  GetProjectIssuesPortResponse,
  GetProjectRewardsPortParams,
  GetProjectRewardsPortResponse,
} from "core/domain/project/project-contract.types";

export interface ProjectStoragePort {
  routes: Record<string, string>;
  getProjectBySlug(params: GetProjectBySlugPortParams): GetProjectBySlugPortResponse;
  getProjectById(params: GetProjectByIdPortParams): GetProjectByIdPortResponse;
  getProjectRewards(params: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectPublicIssues(params: GetProjectIssuesPortParams): GetProjectIssuesPortResponse;
}
