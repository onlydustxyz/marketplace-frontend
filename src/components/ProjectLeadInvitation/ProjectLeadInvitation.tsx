import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";

import { useIntl } from "hooks/translate/use-translate";

import ProjectLeadInvitationView, { CalloutSizes } from "./ProjectLeadInvitationView";

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
  const { T } = useIntl();
  const { mutate, ...rest } = MeApi.mutations.useAcceptProjectLeaderInvitation({
    params: { projectId, projectSlug },
  });

  const onAcceptInvite = () => {
    mutate(null);
  };

  useMutationAlert({
    mutation: rest,
    success: {
      message: T("projectLeadInvitation.success", { projectName }),
    },
    error: {
      default: true,
    },
  });

  return isInvited ? (
    <ProjectLeadInvitationView
      projectName={projectName}
      onClick={onAcceptInvite}
      size={size}
      isLoading={rest.isPending}
    />
  ) : null;
}
