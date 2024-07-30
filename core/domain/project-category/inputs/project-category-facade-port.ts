import {
  GetProjectCategoriesPortParams,
  GetProjectCategoriesPortResponse,
} from "core/domain/project-category/project-category-contract.types";

export interface ProjectCategoryFacadePort {
  getProjectCategories(p: GetProjectCategoriesPortParams): GetProjectCategoriesPortResponse;
}
