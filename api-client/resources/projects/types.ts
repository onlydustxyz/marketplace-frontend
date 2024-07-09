import { components, operations } from "src/__generated/api";

/* --------------------------------- Projects Get All -------------------------------- */

export type ProjectsGetAllQueryParams = Omit<
  operations["getProjects"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

export type GetProjectPageResponse = components["schemas"]["ProjectPageResponse"];
export type GetProjectPageItemResponse = components["schemas"]["ProjectPageItemResponse"];

/* --------------------------------- Projects Get Issues -------------------------------- */

export type ProjectsGetIssuesPathParams = operations["getProjectIssues"]["parameters"]["path"];

export type ProjectsGetIssuesQueryParams = Omit<
  operations["getProjectIssues"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

export type GetProjectIssuesPageResponse = components["schemas"]["ProjectIssuesPageResponse"];

/* --------------------------------- ProjectLinkResponse -------------------------------- */
export type ProjectLinkResponse = components["schemas"]["ProjectLinkResponse"];

/* --------------------------------- Project Categories -------------------------------- */

export type GetProjectCategories = components["schemas"]["ProjectCategoriesResponse"];

export type ProjectCategoriesItem = components["schemas"]["ProjectCategoryResponse"];

/* --------------------------------- Project by slug -------------------------------- */

export type GetProjectBySlugPathParams = operations["getProjectBySlug"]["parameters"]["path"];
export type GetProjectBySlugQueryParams = operations["getProjectBySlug"]["parameters"]["query"];
export type GetProjectBySlugResponse = components["schemas"]["ProjectResponse"];
