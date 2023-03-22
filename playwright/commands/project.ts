import { gql } from "@apollo/client/core";
import {
  AcceptProjectLeaderInvitationMutation,
  AcceptProjectLeaderInvitationMutationVariables,
  InviteProjectLeaderMutation,
  InviteProjectLeaderMutationVariables,
  LinkGithubRepoMutation,
  LinkGithubRepoMutationVariables,
  UpdateBudgetAllocationMutation,
  UpdateBudgetAllocationMutationVariables,
} from "../__generated/graphql";
import { mutateAsAdmin, Uuid } from "./common";

export const addProjectLeader = async (projectId: Uuid, githubUserId: number) => {
  const response = await mutateAsAdmin<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>({
    mutation: INVITE_PROJECT_LEADER,
    variables: {
      projectId,
      githubUserId,
    },
  });

  await mutateAsAdmin<AcceptProjectLeaderInvitationMutation, AcceptProjectLeaderInvitationMutationVariables>({
    mutation: ACCEPT_PROJECT_LEADER_INVITATION,
    variables: {
      invitationId: response.data?.inviteProjectLeader,
    },
  });
};

export const linkRepo = async (projectId: Uuid, githubRepoId: number) =>
  await mutateAsAdmin<LinkGithubRepoMutation, LinkGithubRepoMutationVariables>({
    mutation: LINK_GITHUB_REPO,
    variables: {
      projectId,
      githubRepoId,
    },
  });

export const setBudgetAllocation = async (projectId: Uuid, amount: number) =>
  await mutateAsAdmin<UpdateBudgetAllocationMutation, UpdateBudgetAllocationMutationVariables>({
    mutation: UPDATE_BUDGET_ALLOCATION,
    variables: {
      projectId,
      amount,
    },
  });

export const CREATE_PROJECT = gql(`
mutation createProject($projectName: String!, $telegramLink: Url!, $logoUrl: Url!, $shortDescription: String!, $longDescription: String!, $initialBudget: Int) {
    createProject(
        name: $projectName,
        telegramLink: $telegramLink,
        logoUrl: $logoUrl,
        shortDescription: $shortDescription,
        longDescription: $longDescription,
        initialBudget: $initialBudget,
    )
}
`);

export const UPDATE_PROJECT = gql(`
mutation updateProject($projectId: Uuid!, $name: String, $telegramLink: Url, $logoUrl: Url, $shortDescription: String, $longDescription: String) {
    updateProject(
        id: $projectId,
        name: $name,
        telegramLink: $telegramLink,
        logoUrl: $logoUrl
        shortDescription: $shortDescription,
        longDescription: $longDescription,
    )
}
`);

export const GET_PROJECT_BUDGET = gql(`
query getProjectBudget($projectId: uuid!) {
    projectsByPk(id: $projectId) {
        budgets {
            id
        }
    }
}
`);

export const UPDATE_BUDGET_ALLOCATION = gql(`
mutation updateBudgetAllocation($projectId: Uuid!, $amount: Int!) {
    updateBudgetAllocation(projectId: $projectId, newRemainingAmountInUsd: $amount)
}
`);

export const LINK_GITHUB_REPO = gql(`
mutation linkGithubRepo($projectId: Uuid!, $githubRepoId: Int!) {
    linkGithubRepo(projectId: $projectId, githubRepoId: $githubRepoId)
}
`);

export const UNLINK_GITHUB_REPO = gql(`
mutation unlinkGithubRepo($projectId: Uuid!, $githubRepoId: Int!) {
    unlinkGithubRepo(projectId: $projectId, githubRepoId: $githubRepoId)
}
`);

export const UNASSIGN_PROJECT_LEAD = gql(`
mutation unassignProjectLead($projectId: Uuid!, $userId: Uuid!) {
    unassignProjectLead(projectId: $projectId, userId: $userId)
}
`);

export const INVITE_PROJECT_LEADER = gql(`
mutation inviteProjectLeader($projectId: Uuid!, $githubUserId: Int!) {
    inviteProjectLeader(projectId: $projectId, githubUserId: $githubUserId)
}
`);

export const ACCEPT_PROJECT_LEADER_INVITATION = gql(`
mutation acceptProjectLeaderInvitation($invitationId: Uuid!) {
    acceptProjectLeaderInvitation(invitationId: $invitationId)
}
`);
