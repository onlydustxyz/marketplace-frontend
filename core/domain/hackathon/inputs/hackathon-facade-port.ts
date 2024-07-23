import {
  GetHackathonByIdProjectIssuesPortParams,
  GetHackathonByIdProjectIssuesPortResponse,
  GetHackathonBySlugPortResponse,
  GetHackathonsBySlugPortParams,
  GetHackathonsPortResponse,
} from "core/domain/hackathon/hackathon-contract.types";

export interface HackathonFacadePort {
  getHackathons(): GetHackathonsPortResponse;
  getHackathonBySlug(params: GetHackathonsBySlugPortParams): GetHackathonBySlugPortResponse;
  getHackathonByIdProjectIssues(
    params: GetHackathonByIdProjectIssuesPortParams
  ): GetHackathonByIdProjectIssuesPortResponse;
}
