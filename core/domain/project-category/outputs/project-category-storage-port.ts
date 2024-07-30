import {
  GetProjectCategoriesPortParams,
  GetProjectCategoriesPortResponse,
} from "core/domain/project-category/project-category-contract.types";

export interface ProjectCategoryStoragePort {
  routes: Record<string, string>;
  getProjectCategories(p: GetProjectCategoriesPortParams): GetProjectCategoriesPortResponse;
}
