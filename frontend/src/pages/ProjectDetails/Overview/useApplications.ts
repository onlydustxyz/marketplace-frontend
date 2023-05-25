import {
  ApplicantFragment,
  ApplicantFragmentDoc,
  useApplyToProjectMutation,
  useGetProjectApplicationsQuery,
} from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

export default function useApplications(projectId: string) {
  const { user } = useAuth();
  const showToaster = useShowToaster();
  const { T } = useIntl();

  const { data } = useGetProjectApplicationsQuery({
    variables: { projectId },
  });

  const [applyToProject, { loading }] = useApplyToProjectMutation({
    variables: { projectId },
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => showToaster(T("applications.confirmationToaster")),
    optimisticResponse: { applyToProject: "new_application" },
    update: (cache, { data }) => {
      const application = cache.writeFragment<ApplicantFragment>({
        fragment: ApplicantFragmentDoc,
        fragmentName: "Applicant",
        data: {
          __typename: "Applications",
          id: data?.applyToProject,
          applicantId: user?.id,
        },
      });

      cache.modify({
        id: `Projects:${projectId}`,
        fields: {
          applications: current => [...current, application],
        },
      });
    },
  });

  return {
    applications: data?.projectsByPk?.applications,
    alreadyApplied: data?.projectsByPk?.applications.some(a => a.applicantId === user?.id),
    applyToProject,
    loading,
  };
}
