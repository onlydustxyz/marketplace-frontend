import { ProjectStoragePort } from "core/domain/project/output/project-storage.port";
import { GetProjectBySlugResponse } from "core/domain/project/project.types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectBySlug: "projects/slug/:slug",
  } as const;

  getProjectBySlug({ pathParams, queryParams }: Parameters<ProjectStoragePort["getProjectBySlug"]>[0]) {
    const path = this.routes["getProjectBySlug"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    return {
      request: () =>
        this.client.request<GetProjectBySlugResponse>({
          path,
          method,
          tag,
          pathParams,
          queryParams,
        }),
      tag,
    };
  }
}
