import { PropsWithChildren } from "react";

import { UseInfiniteListResponse } from "src/api/Project/queries";

import { ProjectTypes } from "src/api/Project/types";
import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

export namespace TProjectContext {
  export interface Props extends PropsWithChildren {}

  export type Return = {
    projects: UseInfiniteListResponse["projects"];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isLoading: boolean;
    count: number;
    filters: {
      values: Filter;
      isCleared: boolean;
      set: (filter: Partial<Filter>) => void;
      clear: () => void;
      count: number;
      options: FiltersOptions;
    };
  };

  export interface Filter {
    mine: boolean;
    technologies: string[];
    ecosystemId: TSelectAutocomplete.Item[];
    search?: string;
    sorting: ProjectTypes.Sorting;
    tags: ProjectTypes.Tags[];
  }

  export interface FiltersOptions {
    technologies: TSelectAutocomplete.Item[];
    ecosystems: TSelectAutocomplete.Item[];
  }

  export const FILTER_KEY = "project_filter-v2-0-0";
  export const DEFAULT_SORTING = ProjectTypes.Sorting.Trending;

  export const DEFAULT_FILTER: Filter = {
    mine: false,
    technologies: [],
    ecosystemId: [],
    tags: [],
    sorting: DEFAULT_SORTING,
  };
}
