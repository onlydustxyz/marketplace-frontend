import ProjectLeadInvitationView, { CalloutSizes } from "./ProjectLeadInvitationView";
import MeApi from "src/api/me";

interface ProjectLeadInvitationProps {
  projectId: string;
  projectName: string;
  projectSlug: string;
  isInvited: boolean;
  size?: CalloutSizes;
}

export default function ProjectLeadInvitation({
  projectId,
  projectSlug,
  size,
  isInvited,
  projectName,
}: ProjectLeadInvitationProps) {
  const { mutate } = MeApi.mutations.useAcceptProjectLeaderInvitation({ params: { projectId, projectSlug } });

  const onAcceptInvite = () => {
    mutate(null);
  };

  return isInvited ? (
    <ProjectLeadInvitationView projectName={projectName} onClick={onAcceptInvite} size={size} />
  ) : null;
}
