import { QueryResult } from "@apollo/client";
import { PendingProjectLeaderInvitationsQuery } from "src/__generated/graphql";

export default function hasProjectInvitation(
  pendingProjectLeaderInvitationsQuery: QueryResult<PendingProjectLeaderInvitationsQuery>,
  projectId: string | undefined
) {
  return (
    projectId &&
    pendingProjectLeaderInvitationsQuery?.data?.pendingProjectLeaderInvitations?.find(
      invite => invite.projectId === projectId
    )
  );
}
