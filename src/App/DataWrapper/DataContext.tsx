import { createContext } from "react";

interface Project {
  name: string | null;
  shortDescription: string | null;
  id: string;
  key: string | null;
}

interface DataContextProps {
  param: string;
  data: Project;
  isLoading?: boolean;
  error?: null | unknown;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);
