import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { DataContext } from "./DataContext";
import { GetProjectsQuery } from "src/__generated/graphql";
import { ProjectDetailsRESTfull } from "src/pages/ProjectDetails";

interface DataDisplayProps {
  param?: string;
  data: ProjectDetailsRESTfull | GetProjectsQuery;
  isLoading?: boolean;
  error?: null | unknown;
  children: ReactNode;
}
export default function DataDisplay({ param, data, isLoading, error, children }: DataDisplayProps) {
  if (!data && !isLoading) {
    return <Navigate to={RoutePaths.NotFound} />;
  }

  const contextValue = { param, data, isLoading, error };

  return data ? <DataContext.Provider value={contextValue}>{children}</DataContext.Provider> : null;
}
