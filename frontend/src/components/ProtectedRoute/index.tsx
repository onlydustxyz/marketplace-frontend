import { PropsWithChildren } from "react";
import { generatePath, Navigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { CustomUserRole, HasuraUserRole, UserRole } from "src/types";

interface ProtectedRouteProps extends PropsWithChildren {
  requiredRole: UserRole;
  redirectTo?: string;
}

export default function ProtectedRoute({
  requiredRole = HasuraUserRole.RegisteredUser,
  redirectTo = RoutePaths.Projects,
  children,
}: ProtectedRouteProps) {
  const { roles, ledProjectIds } = useAuth();
  const params = useParams();

  const isAuthorized = () => {
    if (!roles.includes(requiredRole)) {
      return false;
    }

    if (requiredRole === CustomUserRole.ProjectLead && params.projectId && !ledProjectIds.includes(params.projectId)) {
      return false;
    }

    return true;
  };

  return isAuthorized() ? <>{children}</> : <Navigate to={generatePath(redirectTo, params)} />;
}
