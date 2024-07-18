import {
  GetHackathonByIdProjectIssuesResponse,
  GetHackathonBySlugResponse,
  GetHackathonsResponse,
} from "core/domain/hackathon/hackathon-contract.types";
import { Hackathon } from "core/domain/hackathon/models/hackathon-model";
import { ListHackathon } from "core/domain/hackathon/models/list-hackathon-model";
import { HackathonStoragePort } from "core/domain/hackathon/outputs/hackathon-storage-port";
import { LinkProject } from "core/domain/project/models/link-project-model";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class HackathonClientAdapter implements HackathonStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getHackathons: "hackathons",
    getHackathonBySlug: "hackathons/slug/:hackathonSlug",
    getHackathonByIdProjectIssues: "hackathons/:hackathonId/project-issues",
  } as const;

  getHackathons = () => {
    const path = this.routes["getHackathons"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetHackathonsResponse>({
        path,
        method,
        tag,
        next: {
          revalidate: 500,
        },
      });

      return {
        ...data,
        hackathons: data.hackathons.map(hackathon => new ListHackathon(hackathon)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getHackathonBySlug = ({ pathParams }: FirstParameter<HackathonStoragePort["getHackathonBySlug"]>) => {
    const path = this.routes["getHackathonBySlug"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetHackathonBySlugResponse>({
        path,
        method,
        tag,
        pathParams,
        next: {
          revalidate: 500,
        },
      });

      return new Hackathon(data);
    };
    return {
      request,
      tag,
    };
  };

  getHackathonByIdProjectIssues = ({
    pathParams,
    queryParams,
  }: FirstParameter<HackathonStoragePort["getHackathonByIdProjectIssues"]>) => {
    const path = this.routes["getHackathonByIdProjectIssues"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetHackathonByIdProjectIssuesResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => ({
          ...project,
          project: new LinkProject(project.project),
        })),
      };
    };
    return {
      request,
      tag,
    };
  };
}
