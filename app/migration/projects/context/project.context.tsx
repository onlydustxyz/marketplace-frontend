"use client";
import { createContext, useMemo } from "react";
import ProjectApi from "src/api/Project";
import { ProjectContextReturn, ProjectsContextProps } from "./project.context.type.ts";

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

  const projects = useMemo(() => data?.pages?.flatMap(({ projects }) => projects) ?? [], [data]);

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
