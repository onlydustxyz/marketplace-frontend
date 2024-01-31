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
  isLoading: false,
  count: 0,
  filters: {
    values: TProjectContext.DEFAULT_FILTER,
    isCleared: true,
    count: 0,
    set: () => null,
    clear: () => null,
    options: {
      technologies: [],
      ecosystems: [],
    },
  },
});

export function ProjectsContextProvider({ children }: TProjectContext.Props) {
  const [storage, setStorage] = useLocalStorage(TProjectContext.FILTER_KEY, TProjectContext.DEFAULT_FILTER);
  const [filters, setFilters] = useState<TProjectContext.Filter>({ ...TProjectContext.DEFAULT_FILTER, ...storage });
  const [filtersOptions, setFiltersOptions] = useState<TProjectContext.FiltersOptions>({
    technologies: [],
    ecosystems: [],
  });
  const queryParams = useMemo(() => {
    const params: useInfiniteBaseQueryProps["queryParams"] = [
      filters.technologies.length > 0 ? ["technologies", filters.technologies.join(",")] : null,
      filters.ecosystemId.length > 0 ? ["ecosystemId", filters.ecosystemId.map(({ id }) => id).join(",")] : null,
      filters.tags.length > 0 ? ["tags", filters.tags.join(",")] : null,
      filters.search ? ["search", filters.search] : null,
      filters.sorting ? ["sort", filters.sorting] : null,
      filters.mine ? ["mine", filters.mine] : null,
    ].filter((param): param is string[] => Boolean(param));

    return params;
  }, [filters]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = ProjectApi.queries.useInfiniteList({
    queryParams,
  });

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(TProjectContext.DEFAULT_FILTER), [filters]);
  const count = useMemo(() => data?.pages[0]?.totalItemNumber || 0, [data]);

  const projects = useMemo(() => data?.pages?.flatMap(({ projects }) => projects) ?? [], [data]);
  const filtersCount = useMemo(() => {
    return filters.tags.length + filters.ecosystemId.length + filters.technologies.length + (filters.mine ? 1 : 0);
  }, [filters]);

  function onFilterChange(newFilter: Partial<TProjectContext.Filter>) {
    const filtersValues = { ...filters, ...newFilter };
    setFilters(filtersValues);
    setStorage(filtersValues);
  }
  function onClearFilter() {
    setFilters(TProjectContext.DEFAULT_FILTER);
    setStorage(TProjectContext.DEFAULT_FILTER);
  }

  useEffect(() => {
    if (data?.pages[0]) {
      const newTechnologies = data?.pages[0]?.technologies;
      const newEcosystems = data?.pages[0]?.ecosystems;
      setFiltersOptions(prevOptions => ({
        ...prevOptions,
        technologies: newTechnologies?.length
          ? newTechnologies.map(name => ({
              label: name,
              id: name,
              value: name,
            }))
          : prevOptions.technologies,
        ecosystems: newEcosystems?.length
          ? newEcosystems.map(({ name, id, logoUrl }) => ({
              id,
              label: name,
              value: id,
              image: logoUrl,
            }))
          : prevOptions.technologies,
      }));
    }
  }, [data]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        hasNextPage,
        count,
        filters: {
          values: filters,
          isCleared,
          set: onFilterChange,
          count: filtersCount,
          clear: onClearFilter,
          options: filtersOptions,
        },
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
