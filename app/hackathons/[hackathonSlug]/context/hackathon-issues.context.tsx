"use client";

import { bootstrap } from "core/bootstrap";
import { GetHackathonByIdProjectIssuesQueryParams } from "core/domain/hackathon/hackathon-contract.types";
import { createContext, useEffect, useMemo, useState } from "react";

import { THackathonIssuesContext } from "./hackathon-issues.context.types";

export const HackathonIssuesContext = createContext<THackathonIssuesContext.Return>({
  projectIssues: [],
  drawer: {
    isOpen: false,
    open: () => null,
    close: () => null,
  },
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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [languages, setLanguages] = useState<THackathonIssuesContext.Languages>([]);
  const [projectIssues, setProjectIssues] = useState<THackathonIssuesContext.ProjectIssues>([]);

  useEffect(() => {
    const fetchHackathonIssues = async () => {
      const hackathonStorage = bootstrap.getHackathonStoragePortForServer();
      const queryParams: GetHackathonByIdProjectIssuesQueryParams = {
        search: filters.search || undefined,
        languageIds: filters.languageIds.length ? filters.languageIds : undefined,
        isAssigned: filters.isAssigned === "all" ? undefined : filters.isAssigned === "available" ? true : false,
      };

      const hackathonProjectIssues = await hackathonStorage
        .getHackathonByIdProjectIssues({
          pathParams: { hackathonId },
          queryParams,
        })
        .request();

      setLanguages(hackathonProjectIssues.languages);
      setProjectIssues(hackathonProjectIssues.projects);
    };

    fetchHackathonIssues();
  }, [hackathonId, filters]);

  const isCleared = useMemo(
    () => JSON.stringify(filters) == JSON.stringify(THackathonIssuesContext.DEFAULT_FILTER),
    [filters]
  );
  const filtersCount = useMemo(() => {
    return filters.languageIds.length + (filters.search ? 1 : 0) + (filters.isAssigned ? 1 : 0);
  }, [filters]);

  const setFilter = (filter: Partial<THackathonIssuesContext.Filter>) => {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(THackathonIssuesContext.DEFAULT_FILTER);
  };

  useEffect(() => {
    if (languages?.length) {
      const newLanguages = languages.map(lang => ({
        id: lang.id,
        name: lang.name,
      }));

      setFiltersOptions({ languages: newLanguages });
    }
  }, [languages]);

  return (
    <HackathonIssuesContext.Provider
      value={{
        projectIssues,
        drawer: {
          isOpen: isDrawerOpen,
          open: () => setIsDrawerOpen(true),
          close: () => setIsDrawerOpen(false),
        },
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
