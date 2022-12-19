import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole, UserRole } from "src/types";

interface ProtectedRouteProps extends PropsWithChildren {
  requiredRole: UserRole;
}

export default function ProtectedRoute({
  requiredRole = HasuraUserRole.RegisteredUser,
  children,
}: ProtectedRouteProps) {
  const { roles } = useAuth();
  if (roles.includes(requiredRole)) {
    return <>{children}</>;
  }

  return <Navigate to={RoutePaths.Projects} />;
}
