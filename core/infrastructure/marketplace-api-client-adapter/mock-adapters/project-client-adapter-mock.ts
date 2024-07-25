import { ProjectStoragePort } from "core/domain/project/outputs/project-storage-port";
import { mockHttpStorageResponseWithParams } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ProjectClientAdapterMock implements ProjectStoragePort {
  constructor() {}

  routes = {};

  getProjectBySlug = mockHttpStorageResponseWithParams<ProjectStoragePort["getProjectBySlug"]>;

  getProjectById = mockHttpStorageResponseWithParams<ProjectStoragePort["getProjectById"]>;

  getProjectRewards = mockHttpStorageResponseWithParams<ProjectStoragePort["getProjectRewards"]>;

  getProjectPublicIssues = mockHttpStorageResponseWithParams<ProjectStoragePort["getProjectPublicIssues"]>;
}
