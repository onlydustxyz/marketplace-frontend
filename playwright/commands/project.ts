import { Uuid } from "../types";
import {
  AcceptProjectLeaderInvitationMutation,
  AcceptProjectLeaderInvitationDocument,
  AcceptProjectLeaderInvitationMutationVariables,
  InviteProjectLeaderDocument,
  InviteProjectLeaderMutation,
  InviteProjectLeaderMutationVariables,
  LinkGithubRepoMutation,
  LinkGithubRepoDocument,
  LinkGithubRepoMutationVariables,
  UpdateBudgetAllocationMutation,
  UpdateBudgetAllocationDocument,
  UpdateBudgetAllocationMutationVariables,
} from "../__generated/graphql";
import { mutateAsAdmin } from "./common";

export const addProjectLeader = async (projectId: Uuid, githubUserId: number) => {
  const response = await mutateAsAdmin<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>({
    mutation: InviteProjectLeaderDocument,
    variables: {
      projectId,
      githubUserId,
    },
  });

  await mutateAsAdmin<AcceptProjectLeaderInvitationMutation, AcceptProjectLeaderInvitationMutationVariables>({
    mutation: AcceptProjectLeaderInvitationDocument,
    variables: {
      invitationId: response.data?.inviteProjectLeader,
    },
  });
};

export const linkRepo = async (projectId: Uuid, githubRepoId: number) =>
  await mutateAsAdmin<LinkGithubRepoMutation, LinkGithubRepoMutationVariables>({
    mutation: LinkGithubRepoDocument,
    variables: {
      projectId,
      githubRepoId,
    },
  });

export const setBudgetAllocation = async (projectId: Uuid, amount: number) =>
  await mutateAsAdmin<UpdateBudgetAllocationMutation, UpdateBudgetAllocationMutationVariables>({
    mutation: UpdateBudgetAllocationDocument,
    variables: {
      projectId,
      amount,
    },
  });
