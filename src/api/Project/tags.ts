import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const PROJECT_TAGS = {
  all: [RESSOURCE_TAGS.PROJECTS],
  details: () => [RESSOURCE_TAGS.PROJECTS, "details"],
  detail_by_slug: (slug: string) => [...PROJECT_TAGS.details(), { slug }],
  detail_by_id: (id: string) => [...PROJECT_TAGS.details(), { id }],
  contribution_detail: (projectId: string, contributionId: string) => [
    RESSOURCE_TAGS.PROJECTS,
    "contributions",
    { projectId, contributionId },
  ],
  rewardable_items: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "rewardable-items", { projectId }],
  completed_rewardable_items: (projectId: string) => [
    RESSOURCE_TAGS.PROJECTS,
    "completed-rewardable-items",
    { projectId },
  ],
  other_works: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "other-works", { projectId }],
  contributors: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "contributors", { projectId }],
};
