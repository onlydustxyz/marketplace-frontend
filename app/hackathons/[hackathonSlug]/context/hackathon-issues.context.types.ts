import { GetHackathonByIdProjectIssuesResponse } from "core/domain/hackathon/hackathon-contract.types";
import { PropsWithChildren } from "react";

export namespace THackathonIssuesContext {
  export interface Props extends PropsWithChildren {
    hackathonId: string;
  }

  export type Languages = GetHackathonByIdProjectIssuesResponse["languages"];
  export type ProjectIssues = GetHackathonByIdProjectIssuesResponse["projects"];

  export interface Return {
    projectIssues: ProjectIssues;
    drawer: {
      isOpen: boolean;
      open: () => void;
      close: () => void;
    };
    filters: {
      values: Filter;
      isCleared: boolean;
      set: (filter: Partial<Filter>) => void;
      clear: () => void;
      count: number;
      options: FiltersOptions;
    };
  }

  export interface Filter {
    search: string;
    languageIds: string[];
    isAssigned: "all" | "available" | "notAvailable";
  }

  export interface FiltersOptions {
    languages: { id: string; name: string }[];
  }

  export const DEFAULT_FILTER: Filter = {
    search: "",
    languageIds: [],
    isAssigned: "all",
  };
}
