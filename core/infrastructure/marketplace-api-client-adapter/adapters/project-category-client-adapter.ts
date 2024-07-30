import { ProjectCategoriesList } from "core/domain/project-category/models/project-categories-list.model";
import { ProjectCategoryStoragePort } from "core/domain/project-category/outputs/project-category-storage-port";
import { GetProjectCategoriesResponse } from "core/domain/project-category/project-category-contract.types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class ProjectCategoryClientAdapter implements ProjectCategoryStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectCategories: "project-categories",
  } as const;

  getProjectCategories = () => {
    const path = this.routes["getProjectCategories"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetProjectCategoriesResponse>({
        path,
        method,
        tag,
      });

      return new ProjectCategoriesList(data);
    };

    return {
      request,
      tag,
    };
  };
}
