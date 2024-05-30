import { components, operations } from "src/__generated/api";

export type EcosystemProjectsPathParams = operations["getEcosystemProjects"]["parameters"]["path"];
export type EcosystemProjectsQueryParams = Omit<
  operations["getEcosystemProjects"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

type EcosystemProjectPageResponse = components["schemas"]["EcosystemProjectPageResponse"];
export interface GetEcosystemProjectPageResponse extends EcosystemProjectPageResponse {}
