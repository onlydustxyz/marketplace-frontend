import { useAcceptProjectLeaderInvitationMutation, useGetProjectLeadInvitationsQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { contextWithCacheHeaders } from "src/utils/headers";
import ProjectLeadInvitationView, { CalloutSizes } from "./ProjectLeadInvitationView";
import MeApi from "src/api/me";

interface ProjectLeadInvitationProps {
  projectId: string;
  projectSlug: string;
  isInvited: boolean;
  size?: CalloutSizes;
}

export default function ProjectLeadInvitation({ projectId, projectSlug, size, isInvited }: ProjectLeadInvitationProps) {
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

  const { mutate } = MeApi.mutations.useAcceptProjectLeaderInvitation({ params: { projectId, projectSlug } });

  const onAcceptInvite = () => {
    mutate(undefined);
  };

  return isInvited ? (
    <ProjectLeadInvitationView projectName={projectName} onClick={onAcceptInvite} size={size} />
  ) : null;
}
