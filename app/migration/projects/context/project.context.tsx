"use client";
import { createContext } from "react";
import { UseInfiniteListResponse } from "src/api/Project/queries";
import ProjectApi from "src/api/Project";

interface ProjectsContextProps {
  children: React.ReactNode;
}

type ProjectContextReturn = {
  projects: UseInfiniteListResponse["projects"];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const ProjectsContext = createContext<ProjectContextReturn>({
  projects: [],
  fetchNextPage: () => null,
  hasNextPage: false,
  isFetchingNextPage: false,
});

export function ProjectsContextProvider({ children }: ProjectsContextProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = ProjectApi.queries.useInfiniteList({
    queryParams: [
      ["mine", "true"],
      ["sort", "RANK"],
    ],
  });
  const projects = data?.pages?.flatMap(({ projects }) => projects) ?? [];

  return (
    <ProjectsContext.Provider
      value={{
        projects: projects,
        fetchNextPage: fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
