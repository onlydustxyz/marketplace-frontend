import { components } from "src/__generated/api";

export interface UpdateHackathonsRegistrationsParams {
  hackathonId: string;
  hackathonSlug: string;
}

export type CommitteeAssignmentLinkResponse = components["schemas"]["CommitteeAssignmentLinkResponse"];
export type CommitteeJuryVoteResponse = components["schemas"]["CommitteeJuryVoteResponse"];

export type MyCommitteeAssignmentsResponse = components["schemas"]["MyCommitteeAssignmentsResponse"];
export interface GetMyCommitteeAssignmentsResponse extends MyCommitteeAssignmentsResponse {}

type MyCommitteeAssignmentResponse = components["schemas"]["MyCommitteeAssignmentResponse"];
export interface GetMyCommitteeAssignmentResponse extends MyCommitteeAssignmentResponse {}

export interface UpdateMyCommitteeAssignmentParams {
  committeeId: string;
  projectId: string;
}

type VoteForCommitteeAssignmentRequest = components["schemas"]["VoteForCommitteeAssignmentRequest"];
export interface UpdateMyCommitteeAssignmentVariables extends VoteForCommitteeAssignmentRequest {}

// Recommended Projects

export type GetRecommendedProjectsPageResponse = components["schemas"]["RecommendedProjectsPageResponse"];
