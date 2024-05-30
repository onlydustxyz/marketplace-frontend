import { components, operations } from "src/__generated/api";

export type EcosystemProjectPathParams = operations["getEcosystemProjects"]["parameters"]["path"];
export type EcosystemProjectQueryParams = operations["getEcosystemProjects"]["parameters"]["query"];

type EcosystemProjectPageResponse = components["schemas"]["EcosystemProjectPageResponse"];
export interface GetEcosystemProjectPageResponse extends EcosystemProjectPageResponse {}
