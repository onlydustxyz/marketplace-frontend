import { gql } from "@apollo/client";
import { generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { PendingProjectLeaderInvitationsQuery } from "src/__generated/graphql";

export default function useSignupRedirection() {
  const { githubUserId } = useAuth();

  const pendingProjectLeaderInvitationsQueryResult = useHasuraQuery<PendingProjectLeaderInvitationsQuery>(
    PENDING_PROJECT_LEADER_INVITATIONS_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { githubUserId },
      skip: !githubUserId,
    }
  );

  const projectId = pendingProjectLeaderInvitationsQueryResult?.data?.pendingProjectLeaderInvitations?.[0]?.projectId;

  return {
    loading: pendingProjectLeaderInvitationsQueryResult.loading,
    url: projectId && generatePath(RoutePaths.MyProjectDetails, { projectId }),
  };
}

const PENDING_PROJECT_LEADER_INVITATIONS_QUERY = gql`
  query PendingProjectLeaderInvitations($githubUserId: bigint) {
    pendingProjectLeaderInvitations(where: { githubUserId: { _eq: $githubUserId } }) {
      id
      projectId
    }
  }
`;
