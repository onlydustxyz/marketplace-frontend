import { ReactElement } from "react";
import { generatePath, Navigate, useParams } from "react-router-dom";
import { useProjectLeader } from "../../../../src/hooks/useProjectLeader/useProjectLeader";
import { RoutePaths } from "../../../../src/App";
import MeApi from "../../../../src/api/me";

export default function LeadGuard({ children }: { children: ReactElement }) {
  const { isLoading } = MeApi.queries.useGetMe({});
  const params = useParams();
  const isProjectLeader = useProjectLeader({ slug: params.projectKey });

  if (isLoading) {
    return null;
  }

  return isProjectLeader ? <>{children}</> : <Navigate to={generatePath(RoutePaths.NotFound, params)} />;
}
