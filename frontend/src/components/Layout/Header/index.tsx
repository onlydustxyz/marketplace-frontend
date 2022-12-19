import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { useJwtRole } from "src/hooks/useJwtRole";
import { CustomUserRole, HasuraUserRole } from "src/types";
import View from "./View";

export default function Header() {
  const location = useLocation();
  const { tokenSet: hasuraToken } = useAuth();
  const { isLoggedIn, roleList } = useJwtRole(hasuraToken?.accessToken);
  const { T } = useIntl();
  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: T("navbar.projects"),
        [RoutePaths.MyProjects]: roleList.includes(CustomUserRole.ProjectLead) ? T("navbar.myProjects") : undefined,
        [RoutePaths.MyContributions]: roleList.includes(HasuraUserRole.RegisteredUser)
          ? T("navbar.myContributions")
          : undefined,
      }}
      isLoggedIn={isLoggedIn}
      selectedMenuItem={location.pathname}
    />
  );
}
