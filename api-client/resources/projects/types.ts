import { components, operations } from "src/__generated/api";

/* --------------------------------- Projects Get All -------------------------------- */

export type ProjectsGetAllQueryParams = Omit<
  operations["getProjects"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

export type GetProjectPageResponse = components["schemas"]["ProjectPageResponse"];
export type GetProjectPageItemResponse = components["schemas"]["ProjectPageItemResponse"];

/* --------------------------------- ProjectLinkResponse -------------------------------- */
export type ProjectLinkResponse = components["schemas"]["ProjectLinkResponse"];

/* --------------------------------- Project Categories -------------------------------- */

export type GetProjectCategories = components["schemas"]["ProjectCategoriesResponse"];

export type ProjectCategoriesItem = components["schemas"]["ProjectCategoryResponse"];
