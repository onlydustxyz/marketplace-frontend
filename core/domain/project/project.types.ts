import { components, operations } from "src/__generated/api";

/* --------------------------------- Get project by slug -------------------------------- */

export type GetProjectBySlugPathParams = operations["getProjectBySlug"]["parameters"]["path"];
export type GetProjectBySlugQueryParams = operations["getProjectBySlug"]["parameters"]["query"];
export type GetProjectBySlugResponse = components["schemas"]["ProjectResponse"];

/* --------------------------------- Get project rewards -------------------------------- */

export type GetProjectRewardsPathParams = operations["getProjectRewards"]["parameters"]["path"];
export type GetProjectRewardsQueryParams = operations["getProjectRewards"]["parameters"]["query"];
export type GetProjectRewardsResponse = components["schemas"]["RewardsPageResponse"];
