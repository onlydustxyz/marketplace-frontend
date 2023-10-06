import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { DataContext } from "./DataContext";
import { GetProjectsQuery } from "src/__generated/graphql";
import { ProjectDetailsRESTfull } from "src/pages/ProjectDetails";

type ExtendedGetProjectsQuery = GetProjectsQuery & {
  technologies?: string[];
  sponsors?: string[];
};
interface DataDisplayProps {
  param?: string;
  data: ProjectDetailsRESTfull | ExtendedGetProjectsQuery;
  loading?: boolean;
  queryLoading?: boolean;
  error?: null | unknown;
  children: ReactNode;
}
export default function DataDisplay({ param, data, loading, queryLoading, error, children }: DataDisplayProps) {
  if (!data && !queryLoading) {
    return <Navigate to={RoutePaths.NotFound} />;
  }

  const contextValue = { param, data, loading, error };

  return data ? <DataContext.Provider value={contextValue}>{children}</DataContext.Provider> : null;
}
