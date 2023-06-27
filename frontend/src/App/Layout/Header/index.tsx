import { gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import { useGetPaymentRequestIdsQuery, useGetOnboardingStateQuery } from "src/__generated/graphql";
import View from "./View";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { TERMS_AND_CONDITIONS_LAST_REDACTION_DATE } from "src/App/OnboardingWrapper";

export default function Header() {
  const location = useLocation();
  const { user, isLoggedIn, githubUserId } = useAuth();
  const { T } = useIntl();
  const dispatchSession = useSessionDispatch();
  const { impersonationSet } = useImpersonationClaims();
  const impersonating = !!impersonationSet;

  const { data: paymentRequestIdsQueryData } = useGetPaymentRequestIdsQuery({
    variables: { githubUserId },
    skip: !githubUserId,
  });

  const onboardingStateQuery = useGetOnboardingStateQuery({
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const hideMenuItems = !!(
    user?.id &&
    !onboardingStateQuery.loading &&
    !impersonating &&
    (!onboardingStateQuery?.data?.onboardingsByPk?.termsAndConditionsAcceptanceDate ||
      new Date(onboardingStateQuery?.data?.onboardingsByPk?.termsAndConditionsAcceptanceDate) <
        new Date(TERMS_AND_CONDITIONS_LAST_REDACTION_DATE))
  );

  const hasPayments = paymentRequestIdsQueryData?.githubUsersByPk?.paymentRequests.length || 0 > 0;

  const myContributionsMenuItem = hasPayments && !hideMenuItems ? T("navbar.payments") : undefined;
  const projectsMenuItem = myContributionsMenuItem && !hideMenuItems ? T("navbar.projects") : undefined;

  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: projectsMenuItem,
        [RoutePaths.Payments]: myContributionsMenuItem,
      }}
      isLoggedIn={isLoggedIn}
      selectedMenuItem={location.pathname}
      onLogin={() => dispatchSession({ method: SessionMethod.SetVisitedPageBeforeLogin, value: location.pathname })}
      impersonating={impersonating}
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
