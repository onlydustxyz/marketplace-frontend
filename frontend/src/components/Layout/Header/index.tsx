import { gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { useSession } from "src/hooks/useSession";
import { CustomUserRole, HasuraUserRole } from "src/types";
import { GetFirstLeadProjectIdQuery } from "src/__generated/graphql";
import View from "./View";

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, roles, user } = useAuth();
  const { T } = useIntl();
  const onlyProjects = !roles.includes(HasuraUserRole.RegisteredUser) && !roles.includes(CustomUserRole.ProjectLead);
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

  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: !onlyProjects ? T("navbar.projects") : undefined,
        [RoutePaths.MyProjectDetails]: roles.includes(CustomUserRole.ProjectLead) ? T("navbar.myProjects") : undefined,
        [RoutePaths.MyContributions]: roles.includes(HasuraUserRole.RegisteredUser)
          ? T("navbar.myContributions")
          : undefined,
      }}
      isLoggedIn={isLoggedIn}
      selectedMenuItem={location.pathname}
      lastVisitedProjectId={lastVisitedProjectId() || data?.user?.projectsLeaded[0]?.projectId}
    />
  );
}

export const GET_FIRST_LEAD_PROJECT_ID = gql`
  query GetFirstLeadProjectId($userId: uuid!) {
    user(id: $userId) {
      projectsLeaded(limit: 1) {
        projectId
      }
    }
  }
`;
