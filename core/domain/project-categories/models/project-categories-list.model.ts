import { ProjectCategory } from "core/domain/project-categories/models/project-category-model";

import { components } from "src/__generated/api";

export type ListProjectCategoriesResponse = components["schemas"]["ProjectCategoriesResponse"];

export interface ListProjectCategoriesInterface extends ListProjectCategoriesResponse {}

export class ListProjectCategories implements ListProjectCategoriesInterface {
  categories!: ListProjectCategoriesResponse["categories"];

  constructor(props: ListProjectCategoriesResponse) {
    this.categories = props.categories.map(category => new ProjectCategory(category));
    Object.assign(this, props);
  }
}
