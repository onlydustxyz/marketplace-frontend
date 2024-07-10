import {
  GetProjectBySlugPathParams,
  GetProjectBySlugQueryParams,
  GetProjectBySlugResponse,
} from "core/domain/types/project.types";
import { HttpClientParameters } from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

export interface ProjectStoragePort {
  getProjectBySlug({
    pathParams,
    queryParams,
  }: HttpClientParameters<{
    PathParams: GetProjectBySlugPathParams;
    QueryParams: GetProjectBySlugQueryParams;
  }>): {
    send: Promise<GetProjectBySlugResponse>;
    tag: string;
  };
}
