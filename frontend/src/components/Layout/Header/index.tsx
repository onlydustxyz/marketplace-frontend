import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { CustomUserRole, HasuraUserRole } from "src/types";
import View from "./View";

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, roles } = useAuth();
  const { T } = useIntl();
  const onlyProjects = !roles.includes(HasuraUserRole.RegisteredUser) && !roles.includes(CustomUserRole.ProjectLead);
  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: !onlyProjects ? T("navbar.projects") : undefined,
        [RoutePaths.MyProjects]: roles.includes(CustomUserRole.ProjectLead) ? T("navbar.myProjects") : undefined,
        [RoutePaths.MyContributions]: roles.includes(HasuraUserRole.RegisteredUser)
          ? T("navbar.myContributions")
          : undefined,
      }}
      isLoggedIn={isLoggedIn}
      selectedMenuItem={location.pathname}
    />
  );
}
