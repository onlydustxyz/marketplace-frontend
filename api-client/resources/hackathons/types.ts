import { components } from "src/__generated/api";

type HackathonsListResponse = components["schemas"]["HackathonsListResponse"];
type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];
type HackathonsListItem = components["schemas"]["HackathonsListItemResponse"];
export interface ListHackathonsResponse extends HackathonsListResponse {}
export interface ListHackathonsItemResponse extends HackathonsListItem {}
export interface GetHackathonDetailsReponse extends HackathonsDetailsResponse {}
