/* --------------------------------- Get hackathons -------------------------------- */
import { ProjectCategory } from "core/domain/project-categories/models/project-category-model";
import { HttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components } from "src/__generated/api";

export type GetProjectCategoriesResponse = components["schemas"]["ProjectCategoriesResponse"];

export type GetProjectCategoriesPortResponse = HttpStorageResponse<
  Omit<GetProjectCategoriesResponse, "categories"> & { categories: ProjectCategory[] }
>;
