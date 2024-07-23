import {
  GetHackathonByIdProjectIssuesPortParams,
  GetHackathonByIdProjectIssuesResponse,
} from "core/domain/hackathon/hackathon-contract.types";
import { PropsWithChildren } from "react";

export namespace THackathonIssuesContext {
  export interface Props extends PropsWithChildren {
    hackathonId: string;
  }

  type ProjectIssues = GetHackathonByIdProjectIssuesResponse["projects"];
  export type QueryParams = GetHackathonByIdProjectIssuesPortParams["queryParams"];

  export interface Return {
    hackathonId: string;
    projectIssues?: ProjectIssues;
    queryParams: QueryParams;
    filters: {
      values: Filter;
      isCleared: boolean;
      set: (filter: Partial<Filter>) => void;
      clear: () => void;
      count: number;
      options: FiltersOptions;
    };
  }

  export type FilterAvailability = "all" | "available" | "notAvailable";

  export interface Filter {
    search: string;
    languageIds: string[];
    availability: FilterAvailability;
  }

  export interface FiltersOptions {
    languages: { id: string; name: string }[];
  }

  export const DEFAULT_FILTER: Filter = {
    search: "",
    languageIds: [],
    availability: "all",
  };
}
