import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { DataContext } from "./DataContext";

interface Project {
  name: string | null;
  shortDescription: string | null;
  id: string;
  key: string | null;
}

interface DataDisplayProps {
  param: string;
  data: Project;
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
