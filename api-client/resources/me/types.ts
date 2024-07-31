import { components, operations } from "src/__generated/api";

/* --------------------------------- Me root -------------------------------- */

type LogoutRequest = operations["logoutMe"];
export interface LogoutUserResponse extends LogoutRequest {}

/* --------------------------------- Me Hackathons -------------------------------- */

export interface UpdateHackathonsRegistrationsParams {
  hackathonId: string;
  hackathonSlug: string;
}

/* --------------------------------- Me Committee Assignment -------------------------------- */

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

/* --------------------------------- Me Rewards -------------------------------- */

export type MyRewardsQueryParams = Omit<operations["getMyRewards"]["parameters"]["query"], "pageIndex" | "pageSize">;
type MyRewardsPageResponse = components["schemas"]["MyRewardsPageResponse"];

export interface GetMyRewardsPageResponse extends MyRewardsPageResponse {}

export type MyRewards = components["schemas"]["MyRewardPageItemResponse"];

/* --------------------------------- Recommended Projects -------------------------------- */

export type GetRecommendedProjectsPageResponse = components["schemas"]["RecommendedProjectsPageResponse"];

/* --------------------------------- Me Onboarding -------------------------------- */

type MyOnboardingResponse = components["schemas"]["OnboardingCompletionResponse"];

export interface GetMyOnboardingResponse extends MyOnboardingResponse {}

/* --------------------------------- My Applications -------------------------------- */

export type PostProjectApplicationCreateRequest = components["schemas"]["ProjectApplicationCreateRequest"];
export type PostProjectApplicationCreateResponse = components["schemas"]["ProjectApplicationCreateResponse"];

export type ProjectApplicationUpdateRequest = components["schemas"]["ProjectApplicationUpdateRequest"];
export type ProjectApplicationUpdatePathParams = operations["updateProjectApplication"]["parameters"]["path"];

/* --------------------------------- My Banners -------------------------------- */

export type CloseBannerPathParams = operations["closeBanner"]["parameters"]["path"];
