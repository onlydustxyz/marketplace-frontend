import { gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import { useGetPaymentRequestIdsQuery, useOwnUserProfileQuery } from "src/__generated/graphql";
import View from "./View";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useOnboarding } from "src/App/OnboardingProvider";

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, githubUserId } = useAuth();
  const { T } = useIntl();
  const dispatchSession = useSessionDispatch();
  const { impersonationSet } = useImpersonationClaims();
  const impersonating = !!impersonationSet;

  const { data: paymentRequestIdsQueryData } = useGetPaymentRequestIdsQuery({
    variables: { githubUserId },
    skip: !githubUserId,
  });

  const { onboardingInProgress } = useOnboarding();
  const profileQuery = useOwnUserProfileQuery({ variables: { githubUserId }, skip: !githubUserId });

  const hasPayments = paymentRequestIdsQueryData?.githubUsersByPk?.paymentRequests.length || 0 > 0;

  const myContributionsMenuItem = hasPayments && !onboardingInProgress ? T("navbar.rewards") : undefined;
  const projectsMenuItem = myContributionsMenuItem && !onboardingInProgress ? T("navbar.projects") : undefined;

  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: projectsMenuItem,
        [RoutePaths.Rewards]: myContributionsMenuItem,
      }}
      isLoggedIn={isLoggedIn}
      selectedMenuItem={location.pathname}
      onLogin={() => dispatchSession({ method: SessionMethod.SetVisitedPageBeforeLogin, value: location.pathname })}
      impersonating={impersonating}
      profileCompletionScore={profileQuery.data?.userProfiles.at(0)?.completionScore}
    />
  );
}

gql`
  query GetPaymentRequestIds($githubUserId: bigint!) {
    githubUsersByPk(id: $githubUserId) {
      ...GithubUserId
      paymentRequests {
        ...PaymentRequestId
      }
    }
  }
`;
