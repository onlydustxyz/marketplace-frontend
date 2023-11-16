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

  /* --------------------------------- USERS -------------------------------- */
  USERS_SEARCH_BY_LOGIN: BASE_API_V1("users/search"),

  /* ----------------------------------- ME ----------------------------------- */
  MY_CONTRIBUTIONS: BASE_API_V1("me/contributions"),
  ME_PROJECT_LEADER_INVITATIONS: (projectId: string) => BASE_API_V1(`me/project-leader-invitations/${projectId}`),
  ME: BASE_API_V1("me"),
  ME_REWARDS: BASE_API_V1("me/rewards"),
  MY_CONTRIBUTED_PROJECTS: BASE_API_V1("me/contributed-projects"),
  MY_CONTRIBUTED_REPOS: BASE_API_V1("me/contributed-repos"),
};
