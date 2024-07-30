import { ProjectCategoryStoragePort } from "core/domain/project-category/outputs/project-category-storage-port";
import { mockHttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ProjectCategoryClientAdapterMock implements ProjectCategoryStoragePort {
  constructor() {}

  routes = {};

  getProjectCategories = mockHttpStorageResponse<ProjectCategoryStoragePort["getProjectCategories"]>;
}
