import { ReactElement } from "react";
import { generatePath, Navigate, useParams } from "react-router-dom";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { RoutePaths } from "src/App";
import MeApi from "src/api/me";

function LeadGuard({ children }: { children: ReactElement }) {
  const { isLoading, isRefetching } = MeApi.queries.useGetMe({});
  const params = useParams();
  const isProjectLeader = useProjectLeader({ slug: params.projectKey });

  if (isLoading || isRefetching) {
    return null;
  }

  return isProjectLeader ? <>{children}</> : <Navigate to={generatePath(RoutePaths.NotFound, params)} />;
}

function LeadComponentGuard({ children }: { children: ReactElement }) {
  const { isLoading } = MeApi.queries.useGetMe({});
  const params = useParams();
  const isProjectLeader = useProjectLeader({ slug: params.projectKey });

  if (isLoading) {
    return null;
  }

  return isProjectLeader ? <>{children}</> : null;
}

export { LeadGuard, LeadComponentGuard };
