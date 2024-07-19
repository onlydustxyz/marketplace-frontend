import { ListIssue } from "core/domain/issue/models/list-issue-model";
import { ProjectStoragePort } from "core/domain/project/outputs/project-storage-port";
import {
  GetProjectByIdResponse,
  GetProjectBySlugResponse,
  GetProjectIssuesResponse,
  GetProjectRewardsResponse,
} from "core/domain/project/project-contract.types";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectBySlug: "projects/slug/:slug",
    getProjectById: "projects/:projectId",
    getProjectRewards: "projects/:projectId/rewards",
    getProjectPublicIssues: "projects/:projectId/public-issues",
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

  getProjectById = ({ pathParams, queryParams }: FirstParameter<ProjectStoragePort["getProjectById"]>) => {
    const path = this.routes["getProjectById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = () =>
      this.client.request<GetProjectByIdResponse>({
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

  getProjectPublicIssues = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProjectStoragePort["getProjectPublicIssues"]>) => {
    const path = this.routes["getProjectPublicIssues"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProjectIssuesResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        issues: data.issues.map(i => new ListIssue(i)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
