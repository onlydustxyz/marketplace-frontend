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
