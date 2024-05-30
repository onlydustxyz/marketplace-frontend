import { components, operations } from "src/__generated/api";

export type EcosystemProjectsPathParams = operations["getEcosystemProjects"]["parameters"]["path"];
export type EcosystemProjectsQueryParams = operations["getEcosystemProjects"]["parameters"]["query"];

type EcosystemProjectPageResponse = components["schemas"]["EcosystemProjectPageResponse"];
export interface GetEcosystemProjectPageResponse extends EcosystemProjectPageResponse {}
