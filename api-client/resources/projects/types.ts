import { components, operations } from "src/__generated/api";

/* --------------------------------- Projects Get All -------------------------------- */

export type ProjectsGetAllQueryParams = Omit<
  operations["getProjects"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

export type GetProjectPageResponse = components["schemas"]["ProjectPageResponse"];
export type GetProjectPageItemResponse = components["schemas"]["ProjectPageItemResponse"];
