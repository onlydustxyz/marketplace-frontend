import { gql } from "@apollo/client";

export const PENDING_PROJECT_LEADER_INVITATIONS_QUERY = gql`
  query PendingProjectLeaderInvitations {
    pendingProjectLeaderInvitations {
      projectId
    }
  }
`;
