import { components, operations } from "src/__generated/api";

export type ApplicationPathParams = operations["getProjectApplication"]["parameters"]["path"];

export type ApplicationsGetAllQueryParams = Omit<
  operations["getProjectsApplications"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

export type GetApplicationPageResponse = components["schemas"]["ProjectApplicationPageResponse"];
export type GetApplicationResponse = components["schemas"]["ProjectApplicationResponse"];
