import { PropsWithChildren } from "react";
import { generatePath, Navigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { parseFlag } from "src/utils/parseFlag";

interface ProtectedByFlagProps extends PropsWithChildren {
  redirectTo?: string;
  flag: string;
}

export default function ProtectedByFlag({ redirectTo = RoutePaths.NotFound, children, flag }: ProtectedByFlagProps) {
  const params = useParams();

  return parseFlag(flag) ? <>{children}</> : <Navigate to={generatePath(redirectTo, params)} />;
}
