import {
  GetProjectCategoriesPortParams,
  GetProjectCategoriesPortResponse,
} from "core/domain/project-categories/project-categories-contract.types";

export interface ProjectCategoriesFacadePort {
  getProjectCategories(p: GetProjectCategoriesPortParams): GetProjectCategoriesPortResponse;
}
