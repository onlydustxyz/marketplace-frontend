import {
  GetProjectBySlugPathParams,
  GetProjectBySlugQueryParams,
  GetProjectBySlugResponse,
} from "core/domain/project/project.types";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

export interface ProjectFacadePort {
  getProjectBySlug(
    params: HttpClientParameters<{
      PathParams: GetProjectBySlugPathParams;
      QueryParams: GetProjectBySlugQueryParams;
    }>
  ): HttpStorageResponse<GetProjectBySlugResponse>;
}
