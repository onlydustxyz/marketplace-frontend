import { QueryResult } from "@apollo/client";
import { PendingProjectLeaderInvitationsQuery } from "src/__generated/graphql";

export default function getInvitationForProject(
  pendingProjectLeaderInvitationsQuery: QueryResult<PendingProjectLeaderInvitationsQuery>,
  projectId: string | undefined
) {
  return (
    projectId !== undefined &&
    pendingProjectLeaderInvitationsQuery?.data?.pendingProjectLeaderInvitations?.find(
      invite => invite.projectId === projectId
    )
  );
}
