"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import ProjectApi from "src/api/Project";
import { TProjectContext } from "./project.context.types";
import { useLocalStorage } from "react-use";
import { useInfiniteBaseQueryProps } from "src/api/useInfiniteBaseQuery";

export const ProjectsContext = createContext<TProjectContext.Return>({
  projects: [],
  fetchNextPage: () => null,
  hasNextPage: false,
  isFetchingNextPage: false,
  count: 0,
  sponsors: [],
  technologies: [],
  filters: {
    values: TProjectContext.DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    options: {
      sponsors: [],
      technologies: [],
    },
  },
});

export function ProjectsContextProvider({ children }: TProjectContext.Props) {
  const [storage, setStorage] = useLocalStorage(TProjectContext.FILTER_KEY, TProjectContext.DEFAULT_FILTER);
  const [filters, setFilters] = useState<TProjectContext.Filter>({ ...TProjectContext.DEFAULT_FILTER, ...storage });

  const queryParams = useMemo(() => {
    const params: useInfiniteBaseQueryProps["queryParams"] = [
      filters.technologies.length > 0 ? ["technologies", filters.technologies.join(",")] : null,
      filters.sponsors.length > 0 ? ["sponsorId", filters.sponsors.join(",")] : null,
      filters.search ? ["search", filters.search] : null,
      filters.sorting ? ["sort", filters.sorting] : null,
      filters.ownership ? ["mine", String(filters.ownership === "Mine")] : null,
    ].filter((param): param is string[] => Boolean(param));

    return params;
  }, [filters]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = ProjectApi.queries.useInfiniteList({
    queryParams,
  });

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(TProjectContext.DEFAULT_FILTER), [filters]);
  const count = useMemo(() => data?.pages[0]?.totalItemNumber || 0, [data]);
  const technologies = useMemo(() => data?.pages[0]?.technologies || [], [data]);
  const sponsors = useMemo(() => data?.pages[0]?.sponsors || [], [data]);
  const projects = useMemo(() => data?.pages?.flatMap(({ projects }) => projects) ?? [], [data]);

  function onFilterChange(newFilter: Partial<TProjectContext.Filter>) {
    const filtersValues = { ...filters, ...newFilter };
    setFilters(filtersValues);
    setStorage(filtersValues);
  }
  function onClearFilter() {
    setFilters(TProjectContext.DEFAULT_FILTER);
    setStorage(TProjectContext.DEFAULT_FILTER);
  }

  /** Need this to migrate existing filter for sponsor */
  useEffect(() => {
    if (storage?.sponsors && storage.sponsors.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anySponsor = storage.sponsors as unknown as any;
      if (anySponsor[0]?.id) {
        onFilterChange({ sponsors: storage.sponsors });
      }
    }
  }, [storage]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        count,
        technologies,
        sponsors,
        filters: {
          values: filters,
          isCleared,
          set: onFilterChange,
          clear: onClearFilter,
          options: {
            technologies: technologies.map(name => ({
              label: name,
              id: name,
              value: name,
            })),
            sponsors: sponsors.map(({ id, name }) => ({
              label: name,
              id,
            })),
          },
        },
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
