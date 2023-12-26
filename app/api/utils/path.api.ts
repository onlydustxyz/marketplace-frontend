export const API_PATH = {
  /* --------------------------------- GITHUB --------------------------------- */
  GITHUB_USERS: "github/users",
  GITHUB_INSTALLATIONS: (installations_id: string) => `github/installations/${installations_id}`,

  /* --------------------------------- PROJECT -------------------------------- */
  PROJECTS: "projects",
  PROJECTS_LOGO: "projects/logos",
  PROJECT_DETAILS: (slug: string) => `projects/${slug}`,
  PROJECTS_BY_SLUG: (slug: string) => `projects/slug/${slug}`,
  PROJECT_CONTRIBUTION_DETAIL: (projectId: string, contributionId: string) =>
    `projects/${projectId}/contributions/${contributionId}`,
  PROJECT_REWARDABLE_ITEMS: (projectId: string) => `projects/${projectId}/rewardable-items`,
  PROJECT_COMPLETED_REWARDABLE_ITEMS: (projectId: string) => `projects/${projectId}/rewardable-items/all-completed`,
  PROJECT_IGNORE_UNIGNORE_CONTRIBUTIONS: (projectId: string) => `projects/${projectId}/ignored-contributions`,
  PROJECT_CREATE_OTHER_WORKS: (projectId: string) => `projects/${projectId}/rewardable-items/other-works`,
  PROJECT_CREATE_OTHER_PULL_REQUEST: (projectId: string) =>
    `projects/${projectId}/rewardable-items/other-pull-requests`,
  PROJECT_CREATE_OTHER_ISSUE: (projectId: string) => `projects/${projectId}/rewardable-items/other-issues`,
  PROJECT_CONTRIBUTORS: (projectId: string) => `projects/${projectId}/contributors`,
  PROJECT_BUDGET: (projectId: string) => `projects/${projectId}/budgets`,
  PROJECT_CONTRIBUTIONS: (projectId: string) => `projects/${projectId}/contributions`,
  PROJECT_INSIGHTS_CONTRIBUTORS_NEWCOMERS: (projectId: string) =>
    `projects/${projectId}/insights/contributors/newcomers`,
  PROJECT_INSIGHTS_CONTRIBUTORS_MOST_ACTIVES: (projectId: string) =>
    `projects/${projectId}/insights/contributors/most-actives`,
  PROJECT_INSIGHTS_CONTRIBUTIONS_STALED: (projectId: string) => `projects/${projectId}/insights/contributions/staled`,
  PROJECT_INSIGHTS_CONTRIBUTORS_CHURNED: (projectId: string) => `projects/${projectId}/insights/contributors/churned`,

  /* --------------------------------- USERS -------------------------------- */
  USERS_SEARCH_BY_LOGIN: "users/search",
  USER_PROFILE_BY_GITHUB_LOGIN: (githubLogin: string) => `users/login/${githubLogin}`,
  USER_PROFILE_BY_GITHUB_ID: (githubId: string) => `users/${githubId}`,

  /* ----------------------------------- ME ----------------------------------- */
  MY_CONTRIBUTIONS: "me/contributions",
  ME_PROJECT_LEADER_INVITATIONS: (projectId: string) => `me/project-leader-invitations/${projectId}`,
  ME: "me",
  ME_REWARDS: "me/rewards",
  ME_GITHUB_ORGANIZATIONS: "me/organizations",
  MY_CONTRIBUTED_PROJECTS: "me/contributed-projects",
  MY_CONTRIBUTED_REPOS: "me/contributed-repos",
  MY_CLAIM: (projectId: string) => `me/project-claims/${projectId}`,
  ME_APPLY_TO_PROJECT: "me/applications",
  MY_PAYOUT_INFO: "me/payout-info",
  ME_PROFILE: "me/profile",
  ME_REWARDS_CURRENCIES: "me/reward-currencies",
  ME_REWARDS_PROJECTS: "me/rewarding-projects",
  ME_PROFILE_PICTURE: "me/profile/avatar",
  /* ------------------------------ TECHNOLOGIES ------------------------------ */
  TECHNOLOGIES: "technologies",
};
