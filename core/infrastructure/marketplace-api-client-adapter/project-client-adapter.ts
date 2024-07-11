import { ProjectStoragePort } from "core/domain/project/outputs/project-storage-port";
import { GetProjectBySlugResponse, GetProjectRewardsResponse } from "core/domain/project/project.types";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectBySlug: "projects/slug/:slug",
    getProjectRewards: "projects/:projectId/rewards",
  } as const;

  getProjectBySlug = ({ pathParams, queryParams }: FirstParameter<ProjectStoragePort["getProjectBySlug"]>) => {
    const path = this.routes["getProjectBySlug"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = () =>
      this.client.request<GetProjectBySlugResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

    return {
      request,
      tag,
    };
  };

  getProjectRewards = ({ pathParams, queryParams }: FirstParameter<ProjectStoragePort["getProjectRewards"]>) => {
    const path = this.routes["getProjectRewards"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = () =>
      this.client.request<GetProjectRewardsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

    return {
      request,
      tag,
    };
  };
}
