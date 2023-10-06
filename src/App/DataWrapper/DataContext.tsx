import { createContext } from "react";
import { GetProjectsQuery } from "src/__generated/graphql";
import { ProjectDetailsRESTfull } from "src/pages/ProjectDetails";

interface DataContextProps {
  param?: string;
  data: ProjectDetailsRESTfull | GetProjectsQuery;
  isLoading?: boolean;
  error?: null | unknown;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);
