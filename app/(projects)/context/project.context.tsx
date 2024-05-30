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

// TODO: @NeoxAzrot Voir avec Pierre pour les ecosystems
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

    const tags = urlParams.getAll("tags");
    const technologies = urlParams.getAll("technologies");
    const ecosystems = urlParams.getAll("ecosystems");
    const search = urlParams.get("search");
    const sort = urlParams.get("sort");

    if (tags.length > 0) {
      filters.tags = tags as TProjectContext.Filter["tags"];
    }

    if (technologies.length > 0) {
      filters.technologies = technologies;
    }

    if (ecosystems.length > 0) {
      filters.ecosystems = filtersOptions.ecosystems.filter(ecosystem =>
        ecosystems.includes(ecosystem.label as string)
      );
    }

    if (search) {
      filters.search = search!;
    }

    if (sort) {
      filters.sorting = sort as TProjectContext.Filter["sorting"];
    }

    return filters;
  };

  const updateURLWithFilters = (filters: TProjectContext.Filter) => {
    const urlParams = new URLSearchParams();

    filters.tags.forEach(tag => urlParams.append("tags", tag));
    // We need to check if the label is a string because of the TSelectAutocomplete.Item type that can be a string or a JSX.Element
    // Here, it's return by the API, it can only be a string
    filters.ecosystems.forEach(({ label }) => urlParams.append("ecosystems", typeof label === "string" ? label : ""));
    filters.technologies.forEach(tech => urlParams.append("technologies", tech));

    if (filters.search) {
      urlParams.set("search", filters.search);
    }

    if (filters.sorting) {
      urlParams.set("sort", filters.sorting);
    }

    router.replace(`?${urlParams.toString()}`);
  };

  // TODO: @NeoxAzrot Voir pour delete le filtersOptions dans le useEffect
  useEffect(() => {
    const initialFilters = getFiltersFromURL();
    setFilters(initialFilters);
  }, [searchParams, filtersOptions]);

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
