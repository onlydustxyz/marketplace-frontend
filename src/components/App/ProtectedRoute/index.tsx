import { PropsWithChildren } from "react";
import { generatePath, Navigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/components/App";
import { useGetProjectIdFromKeyQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { CustomUserRole, HasuraUserRole, UserRole } from "src/types";
import { contextWithCacheHeaders } from "src/utils/headers";

interface ProtectedRouteProps extends PropsWithChildren {
  requiredRole: UserRole;
  redirectTo?: string;
}

export default function ProtectedRoute({
  requiredRole = HasuraUserRole.RegisteredUser,
  redirectTo = RoutePaths.NotFound,
  children,
}: ProtectedRouteProps) {
  const { roles, ledProjectIds } = useAuth();
  const params = useParams();

  const { data } = useGetProjectIdFromKeyQuery({
    variables: { projectKey: params.projectKey || "" },
    skip: !params.projectKey,
    ...contextWithCacheHeaders,
  });

  const projectId = data?.projects[0].id;

  const isAuthorized = () => {
    if (!roles.includes(requiredRole)) {
      return false;
    }

    if (requiredRole === CustomUserRole.ProjectLead && projectId && !ledProjectIds.includes(projectId)) {
      return false;
    }

    return true;
  };

  return isAuthorized() ? <>{children}</> : <Navigate to={generatePath(redirectTo, params)} />;
}
