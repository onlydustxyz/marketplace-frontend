import { ApplicantFragment, ApplicantFragmentDoc, useApplyToProjectMutation } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

export default function useApplications(projectId: string) {
  const { user } = useAuth();
  const showToaster = useShowToaster();
  const { T } = useIntl();

  const [applyToProject, { loading }] = useApplyToProjectMutation({
    variables: { projectId },
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => showToaster(T("applications.confirmationToaster")),
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
    applyToProject,
    loading,
  };
}
