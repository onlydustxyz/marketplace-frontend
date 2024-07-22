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

export interface ProjectFacadePort {
  getProjectBySlug(params: GetProjectBySlugPortParams): GetProjectBySlugPortResponse;
  getProjectById(params: GetProjectByIdPortParams): GetProjectByIdPortResponse;
  getProjectRewards(params: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectPublicIssues(params: GetProjectIssuesPortParams): GetProjectIssuesPortResponse;
}
