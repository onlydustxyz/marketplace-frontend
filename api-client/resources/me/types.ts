import { components } from "src/__generated/api";

export interface UpdateHackathonsRegistrationsParams {
  hackathonId: string;
  hackathonSlug: string;
}

export type CommitteeAssignmentLinkResponse = components["schemas"]["CommitteeAssignmentLinkResponse"];

type MyCommitteeAssignmentsResponse = components["schemas"]["MyCommitteeAssignmentsResponse"];
export interface GetMyCommitteeAssignmentsResponse extends MyCommitteeAssignmentsResponse {}

type MyCommitteeAssignmentResponse = components["schemas"]["MyCommitteeAssignmentResponse"];
export interface GetMyCommitteeAssignmentResponse extends MyCommitteeAssignmentResponse {}
