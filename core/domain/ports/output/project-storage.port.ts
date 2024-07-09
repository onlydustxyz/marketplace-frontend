import {
  GetProjectBySlugPathParams,
  GetProjectBySlugQueryParams,
  GetProjectBySlugResponse,
} from "api-client/resources/projects/types";
import { ParametersInterface } from "api-client/types/parameters-interface";

export interface ProjectStoragePort {
  getProjectBySlug({
    pathParams,
    queryParams,
  }: ParametersInterface<{
    PathParams: GetProjectBySlugPathParams;
    QueryParams: GetProjectBySlugQueryParams;
  }>): Promise<GetProjectBySlugResponse>;
}
