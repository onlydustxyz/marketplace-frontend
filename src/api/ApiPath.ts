export const BASE_API_V1 = (path: string) => `/api/v1/${path}`;

export const API_PATH = {
  /** TO KEEP */
  SAMPLES: BASE_API_V1("samples"),
  SAMPLE_BY_ID: (id: string) => BASE_API_V1(`samples/${id}`),

  /* --------------------------------- GITHUB --------------------------------- */
  GITHUB_USERS: BASE_API_V1("github/users"),
  GITHUB_INSTALLATIONS: (installations_id: string) => BASE_API_V1(`github/installations/${installations_id}`),

  /* --------------------------------- PROJECT -------------------------------- */
  PROJECTS: BASE_API_V1("projects"),
  PROJECTS_LOGO: BASE_API_V1("projects/logos"),
  PROJECT_DETAILS: (slug: string) => BASE_API_V1(`projects/${slug}`),
  PROJECTS_BY_SLUG: (slug: string) => BASE_API_V1(`projects/slug/${slug}`),
  PROJECT_CONTRIBUTION_DETAIL: (projectId: string, contributionId: string) =>
    BASE_API_V1(`projects/${projectId}/contributions/${contributionId}`),
  PROJECT_REWARD_DETAIL: (rewardId: string, projectId: string) =>
    BASE_API_V1(`projects/${projectId}/rewards/${rewardId}`),
  PROJECT_REWARDABLE_ITEMS: (projectId: string) => BASE_API_V1(`projects/${projectId}/rewardable-items`),
  PROJECT_COMPLETED_REWARDABLE_ITEMS: (projectId: string) =>
    BASE_API_V1(`projects/${projectId}/rewardable-items/all-completed`),
  PROJECT_IGNORE_UNIGNORE_CONTRIBUTIONS: (projectId: string) =>
    BASE_API_V1(`projects/${projectId}/ignored-contributions`),
  PROJECT_CREATE_OTHER_WORKS: (projectId: string) => BASE_API_V1(`projects/${projectId}/rewardable-items/other-works`),
  PROJECT_CREATE_OTHER_PULL_REQUEST: (projectId: string) =>
    BASE_API_V1(`projects/${projectId}/rewardable-items/other-pull-requests`),
  PROJECT_CREATE_OTHER_ISSUE: (projectId: string) => BASE_API_V1(`projects/${projectId}/rewardable-items/other-issues`),
  PROJECT_CONTRIBUTORS: (projectId: string) => BASE_API_V1(`projects/${projectId}/contributors`),
  PROJECT_BUDGET: (projectId: string) => BASE_API_V1(`projects/${projectId}/budgets`),
  PROJECT_CONTRIBUTIONS: (projectId: string) => BASE_API_V1(`projects/${projectId}/contributions`),
  PROJECT_INSIGHTS_CONTRIBUTORS_NEWCOMERS: (projectId: string) =>
    BASE_API_V1(`projects/${projectId}/insights/contributors/newcomers`),
  PROJECT_INSIGHTS_CONTRIBUTORS_MOST_ACTIVES: (projectId: string) =>
    BASE_API_V1(`projects/${projectId}/insights/contributors/most-actives`),
  PROJECT_INSIGHTS_CONTRIBUTIONS_STALED: (projectId: string) =>
    BASE_API_V1(`projects/${projectId}/insights/contributions/staled`),
  PROJECT_INSIGHTS_CONTRIBUTORS_CHURNED: (projectId: string) =>
    BASE_API_V1(`projects/${projectId}/insights/contributors/churned`),
  PROJECT_HIDE_CONTRIBUTOR: (projectId: string, githubUserId: string) =>
    BASE_API_V1(`projects/${projectId}/contributors/${githubUserId}/hidden`),
  PROJECT_SHOW_CONTRIBUTOR: (projectId: string, githubUserId: string) =>
    BASE_API_V1(`projects/${projectId}/contributors/${githubUserId}/hidden`),

  /* --------------------------------- USERS -------------------------------- */
  USERS_SEARCH_BY_LOGIN: BASE_API_V1("users/search"),
  USER_PROFILE_BY_GITHUB_LOGIN: (githubLogin: string) => BASE_API_V1(`users/login/${githubLogin}`),
  USER_PROFILE_BY_GITHUB_ID: (githubId: string) => BASE_API_V1(`users/${githubId}`),

  /* ----------------------------------- ME ----------------------------------- */
  MY_CONTRIBUTIONS: BASE_API_V1("me/contributions"),
  ME_PROJECT_LEADER_INVITATIONS: (projectId: string) => BASE_API_V1(`me/project-leader-invitations/${projectId}`),
  ME: BASE_API_V1("me"),
  ME_REWARDS: BASE_API_V1("me/rewards"),
  ME_REWARD_DETAIL: (rewardId: string) => BASE_API_V1(`me/rewards/${rewardId}`),
  ME_REWARDS_PENDING_INVOICE: BASE_API_V1("me/rewards/pending-invoice"),
  ME_GITHUB_ORGANIZATIONS: BASE_API_V1("me/organizations"),
  MY_CONTRIBUTED_PROJECTS: BASE_API_V1("me/contributed-projects"),
  MY_CONTRIBUTED_REPOS: BASE_API_V1("me/contributed-repos"),
  MY_CLAIM: (projectId: string) => BASE_API_V1(`me/project-claims/${projectId}`),
  ME_APPLY_TO_PROJECT: BASE_API_V1("me/applications"),
  ME_MARK_INVOICE_AS_RECEIVED: BASE_API_V1("me/invoices"),
  MY_PAYOUT_SETTINGS: BASE_API_V1("me/payout-settings"),
  ME_PROFILE: BASE_API_V1("me/profile"),
  ME_REWARDS_CURRENCIES: BASE_API_V1("me/reward-currencies"),
  ME_REWARDS_PROJECTS: BASE_API_V1("me/rewarding-projects"),
  ME_PROFILE_PICTURE: BASE_API_V1("me/profile/avatar"),
  ME_BILLING_INDIVIDUAL: BASE_API_V1("me/billing-profiles/individual"),
  ME_BILLING_COMPANY: BASE_API_V1("me/billing-profiles/company"),
  ME_BILLING_PROFILES: BASE_API_V1("me/billing-profiles"),
  ME_SYNC_GITHUB_PROFILE: BASE_API_V1("me/profile/github"),
  /* ------------------------------ TECHNOLOGIES ------------------------------ */
  TECHNOLOGIES: BASE_API_V1("technologies"),
};
