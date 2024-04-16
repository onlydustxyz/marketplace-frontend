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
  other_pull_requests: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "other-pull-requests", { projectId }],
  other_issues: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "other-issues", { projectId }],
  contributors: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "contributors", { projectId }],
  budgets: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "budgets", { projectId }],
  contributions: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "contributions", { projectId }],
  contributors_newcomers: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "contributors-newcomers", { projectId }],
  contributors_most_actives: (projectId: string) => [
    RESSOURCE_TAGS.PROJECTS,
    "contributors-most-actives",
    { projectId },
  ],
  contributions_staled: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "contributions-staled", { projectId }],
  contributors_churned: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "contributors-churned", { projectId }],
  hide_contributor: (projectId: string, githubUserId: string) => [
    RESSOURCE_TAGS.PROJECTS,
    "hide-contributors",
    { projectId, githubUserId },
  ],
  show_contributor: (projectId: string, githubUserId: string) => [
    RESSOURCE_TAGS.PROJECTS,
    "show-contributors",
    { projectId, githubUserId },
  ],
  good_first_issues: (projectId: string) => [RESSOURCE_TAGS.PROJECTS, "good-first-issues", { projectId }],
};
