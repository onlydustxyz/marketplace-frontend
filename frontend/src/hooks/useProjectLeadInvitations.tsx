import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { PendingProjectLeaderInvitationsQuery } from "src/__generated/graphql";
import { useAuth } from "./useAuth";
import { gql } from "@apollo/client";

export const useProjectLeadInvitations = () => {
  const { user } = useAuth();
  const pendingInvitationsQuery = useHasuraQuery<PendingProjectLeaderInvitationsQuery>(
    PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
    HasuraUserRole.RegisteredUser,
    { skip: !user?.id }
  );

  const [acceptInvitation, acceptInvitationResponse] = useHasuraMutation(
    ACCEPT_PROJECT_LEADER_INVITATION_MUTATION,
    HasuraUserRole.RegisteredUser
  );

  const getInvitationForProject = (projectId: string) =>
    pendingInvitationsQuery.data?.pendingProjectLeaderInvitations?.find(invite => invite.projectId === projectId);

  const amIInvitedForProject = (projectId: string): boolean => !!getInvitationForProject(projectId);

  return {
    allInvitations: pendingInvitationsQuery.data?.pendingProjectLeaderInvitations,
    getInvitationForProject,
    amIInvitedForProject,
    acceptInvitation,
    acceptInvitationResponse,
  };
};

export const PENDING_PROJECT_LEADER_INVITATIONS_QUERY = gql`
  query PendingProjectLeaderInvitations {
    pendingProjectLeaderInvitations {
      id
      projectId
    }
  }
`;

export const ACCEPT_PROJECT_LEADER_INVITATION_MUTATION = gql`
  mutation acceptProjectLeaderInvitation($invitationId: Uuid!) {
    acceptProjectLeaderInvitation(invitationId: $invitationId)
  }
`;
