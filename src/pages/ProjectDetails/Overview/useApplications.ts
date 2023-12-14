import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

export default function useApplications(projectId: string, projectSlug: string) {
  const { T } = useIntl();
  const { data: userData } = MeApi.queries.useGetMe({});

  const { mutate: applyProjectMutation, ...restMutation } = MeApi.mutations.useApplyProject({
    params: { projectSlug },
  });

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("applications.confirmationToaster"),
    },
    error: {
      default: true,
    },
  });

  return {
    alreadyApplied: !!(userData?.projectsAppliedTo || [])?.find(appliedTo => appliedTo === projectId),
    applyToProject: () => (projectId ? applyProjectMutation({ projectId }) : undefined),
  };
}
