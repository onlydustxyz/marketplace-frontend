import { createContext } from "react";
import { GetProjectsQuery } from "src/__generated/graphql";

interface Project {
  name: string | null;
  shortDescription: string | null;
  id: string;
  key: string | null;
}

interface DataContextProps {
  param?: string;
  data: Project | GetProjectsQuery;
  isLoading?: boolean;
  error?: null | unknown;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);
