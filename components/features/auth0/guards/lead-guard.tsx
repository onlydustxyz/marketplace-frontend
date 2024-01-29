import { ReactElement } from "react";
import { Navigate, generatePath, useParams } from "react-router-dom";

import { RoutePaths } from "src/App";
import MeApi from "src/api/me";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

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
