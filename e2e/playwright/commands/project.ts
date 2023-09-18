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
} from "../__generated/graphql";
import { fetchAsAdmin, getEnv, mutateAsAdmin, mutateAsRegisteredUser } from "./common";

export const addProjectLeader = async (projectId: Uuid, githubUserId: number, userToken: string) => {
  const response = await mutateAsAdmin<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>({
    mutation: InviteProjectLeaderDocument,
    variables: {
      projectId,
      githubUserId,
    },
  });

  await mutateAsRegisteredUser<AcceptProjectLeaderInvitationMutation, AcceptProjectLeaderInvitationMutationVariables>(
    userToken,
    {
      mutation: AcceptProjectLeaderInvitationDocument,
      variables: {
        invitationId: response.data?.inviteProjectLeader,
      },
    }
  );
};

export const linkRepo = async (projectId: Uuid, githubRepoId: number) =>
  await mutateAsAdmin<LinkGithubRepoMutation, LinkGithubRepoMutationVariables>({
    mutation: LinkGithubRepoDocument,
    variables: {
      projectId,
      githubRepoId,
    },
  });

export const setBudgetAllocation = async (projectId: Uuid, amount: number) => {
  const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/projects/${projectId}/budget`, {
    method: "PUT",
    body: JSON.stringify({
      amount,
      currency: "USD",
    }),
  });

  return await response.json();
};

export const create = async <T>(args: T) => fetchAsAdmin("projects", "POST", args);
