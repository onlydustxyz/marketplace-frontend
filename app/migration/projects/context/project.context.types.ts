import { PropsWithChildren } from "react";

import { components } from "src/__generated/api";
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
    count: number;
    sponsors: components["schemas"]["SponsorResponse"][];
    technologies: string[];
    filters: {
      values: Filter;
      isCleared: boolean;
      set: (filter: Partial<Filter>) => void;
      clear: () => void;
      count: number;
      options: {
        technologies: TSelectAutocomplete.Item[];
      };
    };
  };

  export interface Filter {
    mine: boolean;
    technologies: string[];
    sponsors: string[];
    search?: string;
    sorting: ProjectTypes.Sorting;
    tags: ProjectTypes.Tags[];
  }

  export const FILTER_KEY = "project_filter-v2-0-0";
  export const DEFAULT_SORTING = ProjectTypes.Sorting.Trending;

  export const DEFAULT_FILTER: Filter = {
    mine: false,
    technologies: [],
    sponsors: [],
    tags: [],
    sorting: DEFAULT_SORTING,
  };
}
