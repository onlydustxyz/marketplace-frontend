import { components } from "src/__generated/api";

export interface UpdateHackathonsRegistrationsParams {
  hackathonId: string;
  hackathonSlug: string;
}

type MyCommitteeAssignmentsResponse = components["schemas"]["MyCommitteeAssignmentsResponse"];
export type CommitteeAssignmentResponse = components["schemas"]["CommitteeAssignmentResponse"];

export interface GetMyCommitteeAssignmentsResponse extends MyCommitteeAssignmentsResponse {}
