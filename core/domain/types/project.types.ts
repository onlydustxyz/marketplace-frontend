import { components, operations } from "src/__generated/api";

/* --------------------------------- Get project by slug -------------------------------- */

export type GetProjectBySlugPathParams = operations["getProjectBySlug"]["parameters"]["path"];
export type GetProjectBySlugQueryParams = operations["getProjectBySlug"]["parameters"]["query"];
export type GetProjectBySlugResponse = components["schemas"]["ProjectResponse"];
