import { components, operations } from "src/__generated/api";

/* --------------------------------- Ecosystems ROOT -------------------------------- */

export type EcosystemsQueryParams = Omit<
  operations["getEcosystemsPage"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

type EcosystemsPageResponse = components["schemas"]["EcosystemPageV2"];

export type EcosystemsPageItem = components["schemas"]["EcosystemPageItemResponse"];
export type EcosystemsBannerColor = components["schemas"]["EcosystemBanner"]["fontColor"];

/* --------------------------------- Ecosystem DETAILS -------------------------------- */
type EcosystemDetailsResponse = components["schemas"]["EcosystemDetailsResponse"];
export interface GetEcosystemDetailsResponse extends EcosystemDetailsResponse {}
export type EcosystemDetailsPathParams = operations["getEcosystemBySlug"]["parameters"]["path"];
/* --------------------------------- Ecosystem PROJECT -------------------------------- */

export type EcosystemProjectsPathParams = operations["getEcosystemProjects"]["parameters"]["path"];
export type EcosystemProjectsQueryParams = Omit<
  operations["getEcosystemProjects"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;
type EcosystemProjectPageResponse = components["schemas"]["EcosystemProjectPageResponse"];

export interface GetEcosystemProjectPageResponse extends EcosystemProjectPageResponse {}
export interface GetEcosystemPageResponse extends EcosystemsPageResponse {}

export type EcosystemProject = components["schemas"]["EcosystemProjectPageItemResponse"];

/* --------------------------------- Ecosystem Contributors -------------------------------- */

export type EcosystemContributorsPathParams = operations["getEcosystemContributors"]["parameters"]["path"];
export type EcosystemContributorsQueryParams = Omit<
  operations["getEcosystemContributors"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

type EcosystemContributorsPageResponse = components["schemas"]["EcosystemContributorsPage"];

export interface GetEcosystemContributorsPageResponse extends EcosystemContributorsPageResponse {}

export type EcosystemContributor = components["schemas"]["EcosystemContributorsPageItemResponse"];
export type EcosystemShortProject = components["schemas"]["ProjectLinkResponse"];

/* --------------------------------- Ecosystem Languages -------------------------------- */

export type EcosystemLanguagesPathParams = operations["getEcosystemLanguages"]["parameters"]["path"];
export type EcosystemLanguagesQueryParams = Omit<
  operations["getEcosystemLanguages"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

type EcosystemLanguagesPageResponse = components["schemas"]["EcosystemLanguagesPageResponse"];

export interface GetEcosystemLanguagesPageResponse extends EcosystemLanguagesPageResponse {}

export type EcosystemLanguage = components["schemas"]["LanguageResponse"];
