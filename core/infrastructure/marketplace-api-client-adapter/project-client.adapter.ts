import { ProjectStoragePort } from "core/domain/ports/output/project-storage.port";
import { GetProjectBySlugResponse } from "core/domain/types/project.types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  // static routes() {
  //   return {
  //     "get-project-by-slug": "projects/slug/:slug"
  //   } as const
  // }

  getProjectBySlug({ pathParams, queryParams }: Parameters<ProjectStoragePort["getProjectBySlug"]>[0]) {
    const path = "projects/slug/:slug";
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    return {
      send: this.client.send<GetProjectBySlugResponse>({
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
