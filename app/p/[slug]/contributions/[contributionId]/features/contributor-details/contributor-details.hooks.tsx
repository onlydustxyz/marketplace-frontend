import { applicationsApiClient } from "api-client/resources/applications";
import { usersApiClient } from "api-client/resources/users";

import { TContributorDetails } from "app/p/[slug]/contributions/[contributionId]/features/contributor-details/contributor-details.types";

import useMutationAlert from "src/api/useMutationAlert";

import { useIntl } from "hooks/translate/use-translate";

export const useContributorDetails = ({ githubId, applicationId }: TContributorDetails.Props) => {
  const { T } = useIntl();
  const { data: userProfile } = usersApiClient.queries.useGetUserPublicProfileByGithubId({
    pathParams: { githubId },
  });

  const { data: application } = applicationsApiClient.queries.useGetApplicationById({
    pathParams: { applicationId },
  });

  const { mutate: deleteApplication } = applicationsApiClient.mutations.useDeleteApplication(
    {
      pathParams: {
        applicationId,
      },
    },
    application?.projectId ?? ""
  );

  const { mutate: acceptApplication, ...acceptMutation } = applicationsApiClient.mutations.useAcceptApplication(
    {
      pathParams: {
        applicationId,
      },
    },
    application?.projectId ?? ""
  );

  useMutationAlert({
    mutation: acceptMutation,
    success: {
      message: T("v2.pages.project.details.applicationDetails.success", {
        login: `${application?.applicant.login}`,
        issue: `${application?.issue.title}`,
      }),
    },
    error: {
      default: true,
    },
  });

  return {
    userProfile,
    application,
    deleteApplication,
    acceptApplication,
  };
};
