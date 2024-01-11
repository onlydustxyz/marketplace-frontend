import { ReactElement } from "react";
import { generatePath, Navigate, useParams } from "react-router-dom";
import MeApi from "src/api/me";
import { RoutePaths } from "src/App";

export function AdminGuard({ children }: { children: ReactElement }) {
  const params = useParams();
  const { isLoading, isRefetching, data: userInfo } = MeApi.queries.useGetMe({});
  const { isAdmin } = userInfo || {};

  if (isLoading || isRefetching) {
    return null;
  }

  return isAdmin ? <>{children}</> : <Navigate to={generatePath(RoutePaths.NotFound, params)} />;
}
