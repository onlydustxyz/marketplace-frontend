import { UseInfiniteListResponse } from "src/api/Project/queries.ts";
import { ReactNode } from "react";
import { Sponsor } from "../../../../src/types.ts";

export interface ProjectsContextProps {
  children: ReactNode;
}

export type ProjectContextReturn = {
  projects: UseInfiniteListResponse["projects"];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  filters: {
    values: ProjectFilter;
    isCleared: boolean;
    set: (filter: Partial<ProjectFilter>) => void;
    clear: () => void;
  };
};

export enum Ownership {
  All = "All",
  Mine = "Mine",
}

export interface ProjectFilter {
  ownership: Ownership;
  technologies: string[];
  sponsors: Sponsor[];
  search?: string;
  sorting?: Sorting;
}

export enum Sorting {
  Trending = "RANK",
  ProjectName = "NAME",
  ReposCount = "REPO_COUNT",
  ContributorsCount = "CONTRIBUTOR_COUNT",
}
export const PROJECT_FILTER_KEY = "project_filter";
export const DEFAULT_PROJECT_SORTING = Sorting.Trending;

export const DEFAULT_PROJECTS_FILTER: ProjectFilter = {
  ownership: Ownership.All,
  technologies: [],
  sponsors: [],
  sorting: DEFAULT_PROJECT_SORTING,
};
