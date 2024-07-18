import { components, operations } from "src/__generated/api";

/* --------------------------------- Get hackathons -------------------------------- */

export type GetHackathonsResponse = components["schemas"]["HackathonsListResponse"];

/* --------------------------------- Get hackathon by slug -------------------------------- */

export type GetHackathonBySlugPathParams = operations["getHackathonBySlug"]["parameters"]["path"];
export type GetHackathonBySlugResponse = components["schemas"]["HackathonsDetailsResponse"];

/* --------------------------------- Get hackathon project issues -------------------------------- */

export type GetHackathonBySlugPathParams = operations["getHackathonBySlug"]["parameters"]["path"];
export type GetHackathonBySlugResponse = components["schemas"]["HackathonsDetailsResponse"];

