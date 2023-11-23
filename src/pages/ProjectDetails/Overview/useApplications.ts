import { useGetProjectApplicationsQuery } from "src/__generated/graphql";
import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { contextWithCacheHeaders } from "src/utils/headers";

export default function useApplications(projectId: string, projectSlug: string) {
  const { user } = useAuth();
  const { T } = useIntl();

  const { data, refetch } = useGetProjectApplicationsQuery({
    variables: { projectId },
    ...contextWithCacheHeaders,
  });

  const { mutate: applyProjectMutation, ...restMutation } = MeApi.mutations.useApplyProject({
    params: { projectSlug },
    options: {
      onSuccess: () => {
        refetch();
      },
    },
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
    applications: data?.projects[0]?.applications,
    alreadyApplied: data?.projects[0]?.applications.some(a => a.applicantId === user?.id),
    applyToProject: () => applyProjectMutation({ projectId }),
  };
}
