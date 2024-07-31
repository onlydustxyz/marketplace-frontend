import {
  GetHackathonByIdProjectIssuesPortParams,
  GetHackathonByIdProjectIssuesPortResponse,
  GetHackathonBySlugPortResponse,
  GetHackathonsBySlugPortParams,
  GetHackathonsPortParams,
  GetHackathonsPortResponse,
} from "core/domain/hackathon/hackathon-contract.types";

export interface HackathonFacadePort {
  getHackathons(params: GetHackathonsPortParams): GetHackathonsPortResponse;
  getHackathonBySlug(params: GetHackathonsBySlugPortParams): GetHackathonBySlugPortResponse;
  getHackathonByIdProjectIssues(
    params: GetHackathonByIdProjectIssuesPortParams
  ): GetHackathonByIdProjectIssuesPortResponse;
}
