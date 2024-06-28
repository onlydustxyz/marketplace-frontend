import { applicationsApiClient } from "api-client/resources/applications";
import { usersApiClient } from "api-client/resources/users";
import { useParams, useRouter } from "next/navigation";

import { TContributorDetails } from "app/p/[slug]/contributions/[contributionId]/features/contributor-details/contributor-details.types";

import useMutationAlert from "src/api/useMutationAlert";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export const useContributorDetails = ({ githubId, applicationId }: TContributorDetails.Props) => {
  const { T } = useIntl();
  const router = useRouter();
  const { slug = "" } = useParams<{ slug?: string }>();
  const { data: userProfile, isLoading: userProfileIsLoading } =
    usersApiClient.queries.useGetUserPublicProfileByGithubId({
      pathParams: { githubId },
    });

  const { data: application, isLoading: applicationIsLoading } = applicationsApiClient.queries.useGetApplicationById({
    pathParams: { applicationId },
  });

  const { mutate: acceptApplication, ...acceptMutation } = applicationsApiClient.mutations.useAcceptApplication(
    {
      pathParams: {
        applicationId,
      },
      onSuccess: () => {
        router.push(NEXT_ROUTER.projects.details.root(slug));
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
    acceptApplication,
    isLoading: userProfileIsLoading || applicationIsLoading,
  };
};
