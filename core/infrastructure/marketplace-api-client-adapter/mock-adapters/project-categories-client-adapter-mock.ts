import { ProjectCategoriesStoragePort } from "core/domain/project-categories/outputs/project-categories-storage-port";
import { mockHttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ProjectCategoriesClientAdapterMock implements ProjectCategoriesStoragePort {
  constructor() {}

  routes = {};

  getProjectCategories = mockHttpStorageResponse<ProjectCategoriesStoragePort["getProjectCategories"]>;
}
