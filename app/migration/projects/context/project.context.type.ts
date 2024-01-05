import { UseInfiniteListResponse } from "src/api/Project/queries.ts";
import { ReactNode } from "react";

export interface ProjectsContextProps {
  children: ReactNode;
}

export type ProjectContextReturn = {
  projects: UseInfiniteListResponse["projects"];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
