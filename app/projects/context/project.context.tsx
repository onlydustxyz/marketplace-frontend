"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";

import ProjectApi from "src/api/Project";
import { useInfiniteBaseQueryProps } from "src/api/useInfiniteBaseQuery";

import { NEXT_ROUTER } from "constants/router";

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
      languages: [],
      ecosystems: [],
      categories: [],
    },
  },
});

export function ProjectsContextProvider({ children }: TProjectContext.Props) {
  const searchParams = useSearchParams();

  const getFiltersFromURL = () => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const filters: TProjectContext.Filter = { ...TProjectContext.DEFAULT_FILTER };

    const tags = urlParams.getAll("tags");
    const languages = urlParams.getAll("languages");
    const ecosystems = urlParams.getAll("ecosystems");
    const categories = urlParams.getAll("categories");
    const search = urlParams.get("search");
    const sort = urlParams.get("sort");
    const hasGoodFirstIssues = urlParams.get("hasGoodFirstIssues");

    if (tags.length > 0) {
      filters.tags = tags as TProjectContext.Filter["tags"];
    }

    if (languages.length > 0) {
      // We have to map the languages to the correct format, because of the type of the filter - TSelectAutocomplete.Item[]
      filters.languages = languages.map(value => ({
        id: value,
        value,
      }));
    }

    if (ecosystems.length > 0) {
      // We have to map the ecosystems to the correct format, because of the type of the filter - TSelectAutocomplete.Item[]
      filters.ecosystems = ecosystems.map(value => ({
        id: value,
        value,
      }));
    }

    if (categories.length > 0) {
      // We have to map the categories to the correct format, because of the type of the filter - TSelectAutocomplete.Item[]
      filters.categories = categories.map(value => ({
        id: value,
        value,
      }));
    }
    if (search) {
      filters.search = search!;
    }

    if (sort) {
      filters.sorting = sort as TProjectContext.Filter["sorting"];
    }

    if (hasGoodFirstIssues) {
      filters.hasGoodFirstIssues = Boolean(hasGoodFirstIssues) as TProjectContext.Filter["hasGoodFirstIssues"];
    }

    return filters;
  };

  const [filters, setFilters] = useState<TProjectContext.Filter>({
    ...TProjectContext.DEFAULT_FILTER,
    ...getFiltersFromURL(),
  });

  const [filtersOptions, setFiltersOptions] = useState<TProjectContext.FiltersOptions>({
    languages: [],
    ecosystems: [],
    categories: [],
  });

  const updateURLWithFilters = (filters: TProjectContext.Filter) => {
    const urlParams = new URLSearchParams();

    filters.tags.forEach(tag => urlParams.append("tags", tag));
    filters.ecosystems.forEach(({ value }) => urlParams.append("ecosystems", value));
    filters.categories.forEach(({ value }) => urlParams.append("categories", value));
    filters.languages.forEach(({ value }) => urlParams.append("languages", value));

    if (filters.search) {
      urlParams.set("search", filters.search);
    }

    const hasOtherFilters =
      filters.tags.length > 0 ||
      filters.ecosystems.length > 0 ||
      filters.categories.length > 0 ||
      filters.languages.length > 0 ||
      filters.search;

    if (filters.sorting && (hasOtherFilters || filters.sorting !== TProjectContext.DEFAULT_SORTING)) {
      urlParams.set("sort", filters.sorting);
    }

    // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#using-the-native-history-api
    window.history.replaceState(null, "", `${NEXT_ROUTER.projects.all}?${urlParams.toString()}`);
  };

  useEffect(() => {
    const initialFilters = getFiltersFromURL();
    setFilters(initialFilters);
  }, [searchParams]);

  const queryParams = useMemo(() => {
    const params: useInfiniteBaseQueryProps["queryParams"] = [
      filters.tags.length > 0 ? ["tags", filters.tags.join(",")] : null,
      filters.languages.length > 0 ? ["languageSlugs", filters.languages.map(({ value }) => value).join(",")] : null,
      filters.ecosystems.length > 0 ? ["ecosystemSlugs", filters.ecosystems.map(({ value }) => value).join(",")] : null,
      filters.categories.length > 0 ? ["categorySlugs", filters.categories.map(({ value }) => value).join(",")] : null,
      filters.search ? ["search", filters.search] : null,
      filters.sorting ? ["sort", filters.sorting] : null,
      filters.hasGoodFirstIssues ? ["hasGoodFirstIssues", filters.hasGoodFirstIssues] : null,
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
    return filters.tags.length + filters.ecosystems.length + filters.languages.length + filters.categories.length;
  }, [filters]);

  function onFilterChange(newFilter: Partial<TProjectContext.Filter>) {
    const filtersValues = { ...filters, ...newFilter };
    setFilters(filtersValues);
    updateURLWithFilters(filtersValues);
  }

  function onClearFilter() {
    const clearFilters = {
      ...filters,
      tags: [],
      ecosystems: [],
      categories: [],
      languages: [],
    };

    setFilters(clearFilters);
    updateURLWithFilters(clearFilters);
  }

  useEffect(() => {
    if (data?.pages[0]) {
      const newLanguages = data?.pages[0]?.languages;
      const newEcosystems = data?.pages[0]?.ecosystems;
      const newCategories = data?.pages[0]?.categories;
      setFiltersOptions(prevOptions => ({
        ...prevOptions,
        languages: newLanguages?.length
          ? newLanguages.map(({ name, id, slug, logoUrl }) => ({
              id,
              label: name,
              value: slug,
              image: logoUrl,
            }))
          : prevOptions.languages,
        ecosystems: newEcosystems?.length
          ? newEcosystems.map(({ name, id, logoUrl, slug }) => ({
              id,
              label: name,
              value: slug,
              image: logoUrl,
            }))
          : prevOptions.ecosystems,
        categories: newCategories?.length
          ? newCategories.map(({ name, id, iconSlug, slug }) => ({
              id,
              label: name,
              value: slug,
              iconSlug,
            }))
          : prevOptions.categories,
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
