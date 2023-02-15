import { gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import { HasuraUserRole } from "src/types";
import { GetPaymentRequestIdsQuery } from "src/__generated/graphql";
import View from "./View";

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, githubUserId } = useAuth();
  const { T } = useIntl();
  const dispatchSession = useSessionDispatch();

  const { data: paymentRequestIdsQueryData } = useHasuraQuery<GetPaymentRequestIdsQuery>(
    GET_MY_CONTRIBUTION_IDS_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { githubUserId },
      skip: !githubUserId,
    }
  );
  const hasPayments =
    paymentRequestIdsQueryData?.paymentRequests && paymentRequestIdsQueryData.paymentRequests.length > 0;

  const myContributionsMenuItem = hasPayments ? T("navbar.myContributions") : undefined;
  const projectsMenuItem = myContributionsMenuItem ? T("navbar.projects") : undefined;

  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: projectsMenuItem,
        [RoutePaths.MyContributions]: myContributionsMenuItem,
      }}
      isLoggedIn={isLoggedIn}
      selectedMenuItem={location.pathname}
      onLogin={() => dispatchSession({ method: SessionMethod.SetVisitedPageBeforeLogin, value: location.pathname })}
    />
  );
}

export const GET_MY_CONTRIBUTION_IDS_QUERY = gql`
  query GetPaymentRequestIds($githubUserId: bigint!) {
    paymentRequests(where: { recipientId: { _eq: $githubUserId } }) {
      id
    }
  }
`;
