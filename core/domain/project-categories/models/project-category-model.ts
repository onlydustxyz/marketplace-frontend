import { components } from "src/__generated/api";

export type ProjectCategoriesResponse = components["schemas"]["ProjectCategoryResponse"];

interface ProjectInterface extends ProjectCategoriesResponse {}

export class ProjectCategory implements ProjectInterface {
  id!: ProjectCategoriesResponse["id"];
  slug!: ProjectCategoriesResponse["slug"];
  name!: ProjectCategoriesResponse["name"];
  description!: ProjectCategoriesResponse["description"];
  iconSlug!: ProjectCategoriesResponse["iconSlug"];
  constructor(protected readonly props: ProjectCategoriesResponse) {
    Object.assign(this, props);
  }
}
