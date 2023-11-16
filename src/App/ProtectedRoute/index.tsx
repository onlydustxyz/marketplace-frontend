import { PropsWithChildren } from "react";
import { generatePath, Navigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { CustomUserRole, HasuraUserRole, UserRole } from "src/types";

interface ProtectedRouteProps extends PropsWithChildren {
  requiredRole: UserRole;
  redirectTo?: string;
}

export default function ProtectedRoute({
  requiredRole = HasuraUserRole.RegisteredUser,
  redirectTo = RoutePaths.NotFound,
  children,
}: ProtectedRouteProps) {
  const { roles } = useAuth();
  const params = useParams();
  const isProjectleader = useProjectLeader({ id: params.projectKey });

  const isAuthorized = () => {
    if (!roles.includes(requiredRole)) {
      return false;
    }

    if (requiredRole === CustomUserRole.ProjectLead && params.projectKey && !isProjectleader) {
      return false;
    }

    return true;
  };

  return isAuthorized() ? <>{children}</> : <Navigate to={generatePath(redirectTo, params)} />;
}
