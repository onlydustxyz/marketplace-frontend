import { API_CLIENT_BASE_URL } from "api-client/config/base-url";
import { GetProjectBySlugResponse } from "api-client/resources/projects/types";
import { ProjectStoragePort } from "core/domain/ports/output/project-storage.port";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  getProjectBySlug({ pathParams, queryParams }: Parameters<ProjectStoragePort["getProjectBySlug"]>[0]) {
    const fetchAdapter = this.client;

    fetchAdapter.setUrl(`${API_CLIENT_BASE_URL}/api/v1/projects/slug/${pathParams?.slug}`);

    if (pathParams) {
      fetchAdapter.setPathParams(pathParams);
    }

    if (queryParams) {
      fetchAdapter.setQueryParams(queryParams);
    }

    return fetchAdapter.send<GetProjectBySlugResponse>();
  }
}
