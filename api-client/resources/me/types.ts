import { components } from "src/__generated/api";

export interface UpdateHackathonsRegistrationsParams {
  hackathonId: string;
  hackathonSlug: string;
}

type MyCommitteeAssignmentsResponse = components["schemas"]["MyCommitteeAssignmentsResponse"];
export type CommitteeAssignmentLinkResponse = components["schemas"]["CommitteeAssignmentLinkResponse"];

export interface GetMyCommitteeAssignmentsResponse extends MyCommitteeAssignmentsResponse {}
