import { ProjectCategory } from "core/domain/project-category/models/project-category-model";

import { components } from "src/__generated/api";

export type ProjectCategoriesListResponse = components["schemas"]["ProjectCategoriesResponse"];

export interface ProjectCategoriesListInterface extends ProjectCategoriesListResponse {}

export class ProjectCategoriesList implements ProjectCategoriesListInterface {
  categories!: ProjectCategoriesListResponse["categories"];

  constructor(props: ProjectCategoriesListResponse) {
    Object.assign(this, props);

    this.categories = props.categories.map(category => new ProjectCategory(category));
  }
}
