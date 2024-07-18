import {
  GetHackathonBySlugPathParams,
  GetHackathonBySlugResponse,
  GetHackathonProjectIssuesPathParams,
  GetHackathonProjectIssuesQueryParams,
  GetHackathonProjectIssuesResponse,
  GetHackathonsResponse,
} from "core/domain/hackathon/hackathon-contract.types";
import { ListHackathon } from "core/domain/hackathon/models/list-hackathon-model";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export interface HackathonFacadePort {
  getHackathons(): HttpStorageResponse<Omit<GetHackathonsResponse, "hackathons"> & { hackathons: ListHackathon[] }>;
  getHackathonBySlug(
    params: HttpClientParameters<{
      PathParams: GetHackathonBySlugPathParams;
    }>
  ): HttpStorageResponse<GetHackathonBySlugResponse>;
  getHackathonProjectIssues(
    params: HttpClientParameters<{
      PathParams: GetHackathonProjectIssuesPathParams;
      QueryParams: GetHackathonProjectIssuesQueryParams;
    }>
  ): HttpStorageResponse<GetHackathonProjectIssuesResponse>;
}
