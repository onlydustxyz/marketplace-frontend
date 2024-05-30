import { components, operations } from "src/__generated/api";

export type EcosystemProjectsPathParams = operations["getEcosystemProjects"]["parameters"]["path"];
export type EcosystemProjectsQueryParams = Omit<
  operations["getEcosystemProjects"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

export type EcosystemsQueryParams = Omit<
  operations["getEcosystemsPage"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

type EcosystemProjectPageResponse = components["schemas"]["EcosystemProjectPageResponse"];
type EcosystemsPageResponse = components["schemas"]["EcosystemPageV2"];

export interface GetEcosystemProjectPageResponse extends EcosystemProjectPageResponse {}
export interface GetEcosystemPageResponse extends EcosystemsPageResponse {}

export type EcosystemProject = components["schemas"]["EcosystemProjectPageItemResponse"];
export type EcosystemsPageItem = components["schemas"]["EcosystemPageItemResponse"];
export type EcosystemsBannerColor = components["schemas"]["EcosystemBanner"]["fontColor"];
