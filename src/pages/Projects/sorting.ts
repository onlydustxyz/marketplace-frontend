export enum Sorting {
  Trending = "RANK",
  ProjectName = "NAME",
  ReposCount = "REPO_COUNT",
  ContributorsCount = "CONTRIBUTOR_COUNT",
}

export const PROJECT_SORTINGS = [Sorting.Trending, Sorting.ProjectName, Sorting.ReposCount, Sorting.ContributorsCount];
