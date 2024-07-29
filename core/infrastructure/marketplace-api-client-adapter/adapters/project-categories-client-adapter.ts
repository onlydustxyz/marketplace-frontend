import { ListProjectCategories } from "core/domain/project-categories/models/project-categories-list.model";
import { ProjectCategoriesStoragePort } from "core/domain/project-categories/outputs/project-categories-storage-port";
import { GetProjectCategoriesResponse } from "core/domain/project-categories/project-categories-contract.types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class ProjectCategoriesClientAdapter implements ProjectCategoriesStoragePort {
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

      return new ListProjectCategories(data);
    };

    return {
      request,
      tag,
    };
  };
}
