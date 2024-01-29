import { ReactElement } from "react";
import { Navigate, generatePath, useParams } from "react-router-dom";

import { RoutePaths } from "src/App";
import MeApi from "src/api/me";

export function AdminGuard({ children }: { children: ReactElement }) {
  const params = useParams();
  const { isLoading, isRefetching, data: userInfo } = MeApi.queries.useGetMe({});
  const { isAdmin } = userInfo || {};

  if (isLoading || isRefetching) {
    return null;
  }

  return isAdmin ? <>{children}</> : <Navigate to={generatePath(RoutePaths.NotFound, params)} />;
}
