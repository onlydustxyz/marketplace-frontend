import { useAcceptProjectLeaderInvitationMutation, useGetProjectLeadInvitationsQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { contextWithCacheHeaders } from "src/utils/headers";
import ProjectLeadInvitationView, { CalloutSizes } from "./ProjectLeadInvitationView";

interface ProjectLeadInvitationProps {
  projectId: string;
  size?: CalloutSizes;
}

export default function ProjectLeadInvitation({ projectId, size }: ProjectLeadInvitationProps) {
  const { githubUserId } = useAuth();

  const { data } = useGetProjectLeadInvitationsQuery({
    variables: { projectId },
    skip: !githubUserId,
    ...contextWithCacheHeaders,
  });

  const invitationId = data?.projects[0]?.pendingInvitations.find(i => i.githubUserId === githubUserId)?.id;
  const projectName = data?.projects[0]?.name;

  const [acceptInvitation] = useAcceptProjectLeaderInvitationMutation({
    context: { graphqlErrorDisplay: "toaster" },
    variables: { invitationId },
    onCompleted: () => window.location.reload(),
  });

  return invitationId ? (
    <ProjectLeadInvitationView projectName={projectName} onClick={acceptInvitation} size={size} />
  ) : null;
}
