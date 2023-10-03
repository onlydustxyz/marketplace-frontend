import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";

interface Project {
  name: string | null;
  shortDescription: string | null;
  id: string;
  key: string | null;
}

interface DataDisplayProps {
  projectKey: string;
  data: Project;
  isLoading?: boolean;
  error?: null | unknown;
  children: ReactNode;
}

export default function DataDisplay({ projectKey, data, isLoading, error, children }: DataDisplayProps) {
  if (!data && !isLoading) {
    return <Navigate to={RoutePaths.NotFound} />;
  }
  return data ? (
    <div>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { projectKey, data, isLoading, error }) : child
      )}
    </div>
  ) : null;
}
