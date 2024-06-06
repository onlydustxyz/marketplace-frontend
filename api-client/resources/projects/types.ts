import { components, operations } from "src/__generated/api";

type ProjectsPageResponse = components["schemas"]["ProjectPageResponse"];

export type ProjectsPageQueryParams = Omit<
  operations["getProjects"]["parameters"]["query"],
  "pageIndex" | "pageSize"
> & {
  pageIndex?: number;
  pageSize?: number;
};
export interface GetAllProjectResponse extends ProjectsPageResponse {}
