import { GetHackathonBySlugResponse, GetHackathonsResponse } from "core/domain/hackathon/hackathon.types";
import { HackathonStoragePort } from "core/domain/hackathon/outputs/hackathon-storage-port";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class HackathonClientAdapter implements HackathonStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getHackathons: "hackathons",
    getHackathonBySlug: "hackathons/slug/:hackathonSlug",
  } as const;

  getHackathons = () => {
    const path = this.routes["getHackathons"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = () =>
      this.client.request<GetHackathonsResponse>({
        path,
        method,
        tag,
      });

    return {
      request,
      tag,
    };
  };

  getHackathonBySlug = ({ pathParams }: FirstParameter<HackathonStoragePort["getHackathonBySlug"]>) => {
    const path = this.routes["getHackathonBySlug"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = () =>
      this.client.request<GetHackathonBySlugResponse>({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };
}
