import { ProjectStoragePort } from "core/domain/ports/output/project-storage.port";
import { GetProjectBySlugResponse } from "core/domain/types/project.types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  getProjectBySlug({ pathParams, queryParams }: Parameters<ProjectStoragePort["getProjectBySlug"]>[0]) {
    const fetchAdapter = this.client;

    fetchAdapter.setUrl("projects/slug/:slug");

    if (pathParams) {
      fetchAdapter.setPathParams(pathParams);
    }

    if (queryParams) {
      fetchAdapter.setQueryParams(queryParams);
    }

    return fetchAdapter.send<GetProjectBySlugResponse>();
  }
}
