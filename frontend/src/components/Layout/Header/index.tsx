import { gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { useSession } from "src/hooks/useSession";
import { CustomUserRole, HasuraUserRole } from "src/types";
import { GetFirstLeadProjectIdQuery, GetPaymentRequestIdsQuery } from "src/__generated/graphql";
import View from "./View";

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, roles, user, githubUserId } = useAuth();
  const { T } = useIntl();
  const { lastVisitedProjectId } = useSession();

  const { data } = useHasuraQuery<GetFirstLeadProjectIdQuery>(
    GET_FIRST_LEAD_PROJECT_ID,
    HasuraUserRole.RegisteredUser,
    {
      skip: !roles.includes(CustomUserRole.ProjectLead),
      variables: {
        userId: user?.id,
      },
    }
  );

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

  const myProjectsMenuItem = roles.includes(CustomUserRole.ProjectLead) ? T("navbar.myProjects") : undefined;
  const myContributionsMenuItem = hasPayments ? T("navbar.myContributions") : undefined;
  const projectsMenuItem = myProjectsMenuItem || myContributionsMenuItem ? T("navbar.projects") : undefined;

  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: projectsMenuItem,
        [RoutePaths.MyProjectDetails]: myProjectsMenuItem,
        [RoutePaths.MyContributions]: myContributionsMenuItem,
      }}
      isLoggedIn={isLoggedIn}
      selectedMenuItem={location.pathname}
      lastVisitedProjectId={lastVisitedProjectId || data?.user?.projectsLeaded[0]?.projectId}
    />
  );
}

export const GET_FIRST_LEAD_PROJECT_ID = gql`
  query GetFirstLeadProjectId($userId: uuid!) {
    user(id: $userId) {
      id
      projectsLeaded(limit: 1) {
        projectId
      }
    }
  }
`;

export const GET_MY_CONTRIBUTION_IDS_QUERY = gql`
  query GetPaymentRequestIds($githubUserId: bigint!) {
    paymentRequests(where: { recipientId: { _eq: $githubUserId } }) {
      id
    }
  }
`;
