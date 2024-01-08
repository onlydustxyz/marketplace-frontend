"use client";
import { createContext, useMemo, useState } from "react";
import ProjectApi from "src/api/Project";
import {
  DEFAULT_PROJECTS_FILTER,
  PROJECT_FILTER_KEY,
  ProjectContextReturn,
  ProjectFilter,
  ProjectsContextProps,
} from "./project.context.type.ts";
import { useLocalStorage } from "react-use";
import { useInfiniteBaseQueryProps } from "../../../../src/api/useInfiniteBaseQuery.ts";

export const ProjectsContext = createContext<ProjectContextReturn>({
  projects: [],
  fetchNextPage: () => null,
  hasNextPage: false,
  isFetchingNextPage: false,
  filters: {
    values: DEFAULT_PROJECTS_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
  },
});

export function ProjectsContextProvider({ children }: ProjectsContextProps) {
  const [storage, setStorage] = useLocalStorage(PROJECT_FILTER_KEY, DEFAULT_PROJECTS_FILTER);
  const [filters, setFilters] = useState<ProjectFilter>({ ...DEFAULT_PROJECTS_FILTER, ...storage });
  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(DEFAULT_PROJECTS_FILTER), [filters]);

  const queryParams = useMemo(() => {
    const params: useInfiniteBaseQueryProps["queryParams"] = [
      filters.technologies.length > 0 ? ["technologies", filters.technologies.join(",")] : null,
      filters.sponsors.length > 0 ? ["sponsorId", filters.sponsors.map(({ id }) => id).join(",")] : null,
      filters.search ? ["search", filters.search] : null,
      filters.sorting ? ["sort", filters.sorting] : null,
      filters.ownership ? ["mine", String(filters.ownership === "Mine")] : null,
    ].filter((param): param is string[] => Boolean(param));

    return params;
  }, [filters]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = ProjectApi.queries.useInfiniteList({
    queryParams: queryParams,
  });

  function onFilterChange(newFilter: Partial<ProjectFilter>) {
    const filtersValues = { ...filters, ...newFilter };
    setFilters(filtersValues);
    setStorage(filtersValues);
  }
  function onClearFilter() {
    setFilters(DEFAULT_PROJECTS_FILTER);
    setStorage(DEFAULT_PROJECTS_FILTER);
  }

  const projects = useMemo(() => data?.pages?.flatMap(({ projects }) => projects) ?? [], [data]);

  return (
    <ProjectsContext.Provider
      value={{
        projects: projects,
        fetchNextPage: fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        filters: {
          values: filters,
          isCleared,
          set: onFilterChange,
          clear: onClearFilter,
        },
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
