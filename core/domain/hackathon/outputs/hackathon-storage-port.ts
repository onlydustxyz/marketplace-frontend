import {
  GetHackathonBySlugPathParams,
  GetHackathonBySlugResponse,
  GetHackathonsResponse,
} from "core/domain/hackathon/hackathon.types";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export interface HackathonStoragePort {
  routes: Record<string, string>;
  getHackathons(): HttpStorageResponse<GetHackathonsResponse>;
  getHackathonBySlug(
    params: HttpClientParameters<{
      PathParams: GetHackathonBySlugPathParams;
    }>
  ): HttpStorageResponse<GetHackathonBySlugResponse>;
}
