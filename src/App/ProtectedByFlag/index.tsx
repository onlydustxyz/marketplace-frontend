import { PropsWithChildren } from "react";
import { generatePath, Navigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";

interface ProtectedByFlagProps extends PropsWithChildren {
  redirectTo?: string;
  isValid: boolean;
}

export default function ProtectedByFlag({ redirectTo = RoutePaths.NotFound, children, isValid }: ProtectedByFlagProps) {
  const params = useParams();

  return isValid ? <>{children}</> : <Navigate to={generatePath(redirectTo, params)} />;
}
