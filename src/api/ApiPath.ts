export const BASE_API_V1 = (path: string) => `/api/v1/${path}`;
export const BASE_API_V2 = (path: string) => `/api/v2/${path}`;

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
  PROJECT_GOOD_FIRST_ISSUES: (projectId: string) => BASE_API_V1(`projects/${projectId}/good-first-issues`),

  /* --------------------------------- USERS -------------------------------- */
  USERS_SEARCH_BY_LOGIN: BASE_API_V1("users/search"),
  USER_CONTRIBUTIONS: (githubId: string) => BASE_API_V2(`users/${githubId}/contributions`),

  /* ------------------------------ ECOSYSTEM ------------------------------ */
  ECOSYSTEM: BASE_API_V1("ecosystems"),

  /* ------------------------------ BILLING PROFILES ------------------------------ */
  INVOICES_LINKED_TO_PROFILE: (billingProfileId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices`),
  DOWNLOAD_INVOICE_LINKED_TO_PROFILE: (billingProfileId: string, invoiceId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/${invoiceId}`),
  UPLOAD_INVOICE_LINKED_TO_PROFILE: (billingProfileId: string, invoiceId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/${invoiceId}`),
  ACCEPT_INVOICE_MANDATE: (billingProfileId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoices/mandate`),
};
