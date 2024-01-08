"use client";
import { createContext, useMemo, useState } from "react";
import ProjectApi from "src/api/Project";
import { ProjectContextReturn, ProjectsContextProps } from "./project.context.type.ts";
import { useInfiniteBaseQueryProps } from "../../../../src/api/useInfiniteBaseQuery.ts";
import { Button } from "@/components/ds/button/button.tsx";

export const ProjectsContext = createContext<ProjectContextReturn>({
  projects: [],
  fetchNextPage: () => null,
  hasNextPage: false,
  isFetchingNextPage: false,
});

export function ProjectsContextProvider({ children }: ProjectsContextProps) {
  const [filters, setFilters] = useState<useInfiniteBaseQueryProps["queryParams"]>([
    ["mine", "true"],
    ["sort", "RANK"],
  ]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = ProjectApi.queries.useInfiniteList({
    queryParams: filters,
  });

  // const queryParams = useMemo(() => {
  //   const params: useInfiniteBaseQueryProps["queryParams"] = [
  //     technologies.length > 0 ? ["technologies", technologies.join(",")] : null,
  //     sponsors.length > 0 ? ["sponsorId", sponsors.map(({ id }) => id).join(",")] : null,
  //     search ? ["search", search] : null,
  //     sorting ? ["sort", sorting] : null,
  //     ownership ? ["mine", String(ownership === "Mine")] : null,
  //   ].filter((param): param is string[] => Boolean(param));
  //
  //   return params;
  // }, [technologies, sponsors, search, sorting, ownership]);

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
      <Button
        onClick={() => {
          setFilters([
            ["mine", "false"],
            ["sort", "RANK"],
          ]);
        }}
      >
        Fake change filter
      </Button>
      {children}
    </ProjectsContext.Provider>
  );
}
