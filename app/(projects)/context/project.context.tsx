"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";

import ProjectApi from "src/api/Project";
import { useInfiniteBaseQueryProps } from "src/api/useInfiniteBaseQuery";

import { TProjectContext } from "./project.context.types";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<TProjectContext.Filter>({ ...TProjectContext.DEFAULT_FILTER });
  const [filtersOptions, setFiltersOptions] = useState<TProjectContext.FiltersOptions>({
    technologies: [],
    ecosystems: [],
  });

  const getFiltersFromURL = () => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const filters: TProjectContext.Filter = { ...TProjectContext.DEFAULT_FILTER };

    if (urlParams.getAll("tags").length > 0) {
      filters.tags = urlParams.getAll("tags") as TProjectContext.Filter["tags"];
    }

    if (urlParams.getAll("technologies").length > 0) {
      filters.technologies = urlParams.getAll("technologies");
    }

    if (urlParams.getAll("ecosystems").length > 0) {
      const ecosystemNames = urlParams.getAll("ecosystems");

      filters.ecosystems = filtersOptions.ecosystems.filter(ecosystem =>
        ecosystemNames.includes(ecosystem.label as string)
      );
    }

    if (urlParams.get("search")) {
      filters.search = urlParams.get("search")!;
    }

    if (urlParams.get("sort")) {
      filters.sorting = urlParams.get("sort") as TProjectContext.Filter["sorting"];
    }

    return filters;
  };

  const updateURLWithFilters = (filters: TProjectContext.Filter) => {
    const urlParams = new URLSearchParams();

    filters.tags.forEach(tag => urlParams.append("tags", tag));
    filters.ecosystems.forEach(({ label, id }) => urlParams.append("ecosystems", label?.toString() || id.toString()));
    filters.technologies.forEach(tech => urlParams.append("technologies", tech));

    if (filters.search) {
      urlParams.set("search", filters.search);
    }

    if (filters.sorting && filters.sorting !== "RANK") {
      urlParams.set("sort", filters.sorting);
    }

    router.replace(`?${urlParams.toString()}`);
  };

  useEffect(() => {
    const initialFilters = getFiltersFromURL();
    setFilters(initialFilters);
  }, [searchParams]);

  const queryParams = useMemo(() => {
    const params: useInfiniteBaseQueryProps["queryParams"] = [
      filters.tags.length > 0 ? ["tags", filters.tags.join(",")] : null,
      filters.technologies.length > 0 ? ["technologies", filters.technologies.join(",")] : null,
      filters.ecosystems.length > 0 ? ["ecosystemId", filters.ecosystems.map(({ id }) => id).join(",")] : null,
      filters.search ? ["search", filters.search] : null,
      filters.sorting ? ["sort", filters.sorting] : null,
    ].filter((param): param is string[] => Boolean(param));

    return params;
  }, [filters]);

  const debouncedQueryParams = useDebounce(queryParams, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = ProjectApi.queries.useInfiniteList({
    queryParams: debouncedQueryParams,
  });

  const isCleared = useMemo(() => JSON.stringify(filters) == JSON.stringify(TProjectContext.DEFAULT_FILTER), [filters]);
  const count = useMemo(() => data?.pages[0]?.totalItemNumber || 0, [data]);

  const projects = useMemo(() => data?.pages?.flatMap(({ projects }) => projects) ?? [], [data]);
  const filtersCount = useMemo(() => {
    return filters.tags.length + filters.ecosystems.length + filters.technologies.length;
  }, [filters]);

  function onFilterChange(newFilter: Partial<TProjectContext.Filter>) {
    const filtersValues = { ...filters, ...newFilter };
    setFilters(filtersValues);
    updateURLWithFilters(filtersValues);
  }
  function onClearFilter() {
    setFilters(TProjectContext.DEFAULT_FILTER);
    updateURLWithFilters(TProjectContext.DEFAULT_FILTER);
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
