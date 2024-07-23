import {
  GetHackathonByIdProjectIssuesPortParams,
  GetHackathonByIdProjectIssuesPortResponse,
  GetHackathonBySlugPortResponse,
  GetHackathonsBySlugPortParams,
  GetHackathonsPortResponse,
} from "core/domain/hackathon/hackathon-contract.types";

export interface HackathonStoragePort {
  routes: Record<string, string>;
  getHackathons(): GetHackathonsPortResponse;
  getHackathonBySlug(params: GetHackathonsBySlugPortParams): GetHackathonBySlugPortResponse;
  getHackathonByIdProjectIssues(
    params: GetHackathonByIdProjectIssuesPortParams
  ): GetHackathonByIdProjectIssuesPortResponse;
}
