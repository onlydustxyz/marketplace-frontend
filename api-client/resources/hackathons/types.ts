import { components } from "src/__generated/api";

type HackathonsListResponse = components["schemas"]["HackathonsListResponse"];
type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];
export interface ListHackathonsResponse extends HackathonsListResponse {}
export interface GetHackathonDetailsReponse extends HackathonsDetailsResponse {}
