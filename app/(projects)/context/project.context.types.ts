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
    technologies: string[];
    ecosystems: TSelectAutocomplete.Item[];
    search?: string;
    sorting: ProjectTypes.Sorting;
    tags: ProjectTypes.Tags[];
  }

  export interface FiltersOptions {
    technologies: TSelectAutocomplete.Item[];
    ecosystems: TSelectAutocomplete.Item[];
  }

  export const DEFAULT_SORTING = ProjectTypes.Sorting.Trending;

  export const DEFAULT_FILTER: Filter = {
    technologies: [],
    ecosystems: [],
    tags: [],
    sorting: DEFAULT_SORTING,
  };
}
