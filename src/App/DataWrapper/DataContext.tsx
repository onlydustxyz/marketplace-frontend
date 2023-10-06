import { createContext } from "react";
import { GetProjectsQuery } from "src/__generated/graphql";
import { ProjectDetailsRESTfull } from "src/pages/ProjectDetails";

export type ExtendedGetProjectsQuery = GetProjectsQuery & {
  technologies?: string[];
  sponsors?: string[];
};
interface DataContextProps {
  param?: string;
  data: ProjectDetailsRESTfull | ExtendedGetProjectsQuery;
  isLoading?: boolean;
  error?: null | unknown;
}

export function isExtendedGetProjectsQuery(
  data: ProjectDetailsRESTfull | ExtendedGetProjectsQuery
): data is ExtendedGetProjectsQuery {
  return (
    (data as ExtendedGetProjectsQuery).technologies !== undefined &&
    (data as ExtendedGetProjectsQuery).sponsors !== undefined
  );
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);
