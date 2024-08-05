"use client";

import { keepPreviousData } from "@tanstack/react-query";
import { HackathonReactQueryAdapter } from "core/application/react-query-adapter/hackathon";
import { createContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";

import { THackathonIssuesContext } from "./hackathon-issues.context.types";

export const HackathonIssuesContext = createContext<THackathonIssuesContext.Return>({
  hackathonId: "",
  projectIssues: [],
  queryParams: {},
  filters: {
    values: THackathonIssuesContext.DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    count: 0,
    options: {
      languages: [],
    },
  },
});

export function HackathonIssuesContextProvider({ children, hackathonId }: THackathonIssuesContext.Props) {
  const [filters, setFilters] = useState<THackathonIssuesContext.Filter>(THackathonIssuesContext.DEFAULT_FILTER);
  const [filtersOptions, setFiltersOptions] = useState<THackathonIssuesContext.FiltersOptions>({ languages: [] });
  const [queryParams, setQueryParams] = useState<THackathonIssuesContext.QueryParams>({});

  const debouncedQueryParams = useDebounce(queryParams, 300);

  const { data: projectIssues } = HackathonReactQueryAdapter.client.useGetHackathonByIdProjectIssues({
    pathParams: { hackathonId },
    queryParams: debouncedQueryParams,
    options: {
      placeholderData: keepPreviousData,
    },
  });

  useEffect(() => {
    setQueryParams({
      search: filters.search || undefined,
      languageIds: filters.languageIds.length ? filters.languageIds : undefined,
      isAssigned: filters.availability === "all" ? undefined : filters.availability === "available" ? false : true,
      statuses: ["OPEN"],
    });
  }, [filters]);

  const isCleared = useMemo(
    () => JSON.stringify(filters) == JSON.stringify(THackathonIssuesContext.DEFAULT_FILTER),
    [filters]
  );
  const filtersCount = useMemo(() => {
    return filters.languageIds.length + (filters.availability !== "all" ? 1 : 0);
  }, [filters]);

  const setFilter = (filter: Partial<THackathonIssuesContext.Filter>) => {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(THackathonIssuesContext.DEFAULT_FILTER);
  };

  useEffect(() => {
    if (projectIssues?.languages?.length) {
      const newLanguages = projectIssues.languages.map(lang => ({
        id: lang.id,
        name: lang.name,
      }));

      setFiltersOptions({ languages: newLanguages });
    }
  }, [projectIssues?.languages]);

  return (
    <HackathonIssuesContext.Provider
      value={{
        hackathonId,
        projectIssues: projectIssues?.projects,
        queryParams,
        filters: {
          values: filters,
          isCleared,
          set: setFilter,
          clear: clearFilters,
          count: filtersCount,
          options: filtersOptions,
        },
      }}
    >
      {children}
    </HackathonIssuesContext.Provider>
  );
}
