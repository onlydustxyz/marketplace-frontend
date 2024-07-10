import {
  GetProjectBySlugPathParams,
  GetProjectBySlugQueryParams,
  GetProjectBySlugResponse,
} from "core/domain/project/project.types";
import { HttpClientParameters } from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

export interface ProjectStoragePort {
  getProjectBySlug({
    pathParams,
    queryParams,
  }: HttpClientParameters<{
    PathParams: GetProjectBySlugPathParams;
    QueryParams: GetProjectBySlugQueryParams;
  }>): {
    request: Promise<GetProjectBySlugResponse>;
    tag: string;
  };
}
