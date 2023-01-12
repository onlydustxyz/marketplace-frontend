export const PENDING_PROJECT_LEADER_INVITATIONS_QUERY = gql`
  query PendingProjectLeaderInvitations {
    pendingProjectLeaderInvitations {
      id
      projectId
    }
  }
`;
