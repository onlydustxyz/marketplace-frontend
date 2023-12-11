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
  PROJECT_CONTRIBUTIONS: (projectId: string) => BASE_API_V1(`projects/${projectId}/contributions`),

  /* --------------------------------- USERS -------------------------------- */
  USERS_SEARCH_BY_LOGIN: BASE_API_V1("users/search"),
  USER_PROFILE_BY_GITHUB_LOGIN: (githubLogin: string) => BASE_API_V1(`users/login/${githubLogin}`),
  USER_PROFILE_BY_GITHUB_ID: (githubId: string) => BASE_API_V1(`users/${githubId}`),

  /* ----------------------------------- ME ----------------------------------- */
  MY_CONTRIBUTIONS: BASE_API_V1("me/contributions"),
  ME_PROJECT_LEADER_INVITATIONS: (projectId: string) => BASE_API_V1(`me/project-leader-invitations/${projectId}`),
  ME: BASE_API_V1("me"),
  ME_REWARDS: BASE_API_V1("me/rewards"),
  ME_GITHUB_ORGANIZATIONS: BASE_API_V1("me/organizations"),
  MY_CONTRIBUTED_PROJECTS: BASE_API_V1("me/contributed-projects"),
  MY_CONTRIBUTED_REPOS: BASE_API_V1("me/contributed-repos"),
  MY_CLAIM: (projectId: string) => BASE_API_V1(`me/project-claims/${projectId}`),
  ME_APPLY_TO_PROJECT: BASE_API_V1("me/applications"),
  MY_PAYOUT_INFO: BASE_API_V1("me/payout-info"),
  ME_PROFILE: BASE_API_V1("me/profile"),
  ME_PROFILE_PICTURE: BASE_API_V1("me/profile/avatar"),
  /* ------------------------------ TECHNOLOGIES ------------------------------ */
  TECHNOLOGIES: BASE_API_V1("technologies"),
};
