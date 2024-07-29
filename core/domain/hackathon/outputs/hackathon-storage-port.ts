import {
  GetHackathonByIdProjectIssuesPortParams,
  GetHackathonByIdProjectIssuesPortResponse,
  GetHackathonBySlugPortResponse,
  GetHackathonsBySlugPortParams,
  GetHackathonsPortParams,
  GetHackathonsPortResponse,
} from "core/domain/hackathon/hackathon-contract.types";

export interface HackathonStoragePort {
  routes: Record<string, string>;
  getHackathons(params: GetHackathonsPortParams): GetHackathonsPortResponse;
  getHackathonBySlug(params: GetHackathonsBySlugPortParams): GetHackathonBySlugPortResponse;
  getHackathonByIdProjectIssues(
    params: GetHackathonByIdProjectIssuesPortParams
  ): GetHackathonByIdProjectIssuesPortResponse;
}
