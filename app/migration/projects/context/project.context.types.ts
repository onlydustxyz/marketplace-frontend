import { PropsWithChildren } from "react";

import { components } from "src/__generated/api";
import { UseInfiniteListResponse } from "src/api/Project/queries";

import { TFiltersDropDown } from "components/ds/drop-down/filters-drop-down.types";
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
        sponsors: TFiltersDropDown.Option[];
      };
    };
  };

  export interface Filter {
    ownership: ProjectTypes.Ownership;
    technologies: string[];
    sponsors: string[];
    search?: string;
    sorting: ProjectTypes.Sorting;
  }

  export const FILTER_KEY = "project_filter";
  export const DEFAULT_SORTING = ProjectTypes.Sorting.Trending;

  export const DEFAULT_FILTER: Filter = {
    ownership: ProjectTypes.Ownership.All,
    technologies: [],
    sponsors: [],
    sorting: DEFAULT_SORTING,
  };
}
