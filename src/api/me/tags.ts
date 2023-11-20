import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const ME_TAGS = {
  all: [RESSOURCE_TAGS.ME],
  rewards: () => [RESSOURCE_TAGS.ME, "rewards"],
  githubOrganization: () => [RESSOURCE_TAGS.ME, "github-organization"],
  contributions: (tags: unknown[] = []) => [RESSOURCE_TAGS.ME, "contributions", ...tags],
  contributedProjects: () => [RESSOURCE_TAGS.ME, "contributed-projects"],
  contributedRepos: () => [RESSOURCE_TAGS.ME, "contributed-repos"],
};
