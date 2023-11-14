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
  PROJECTS_BY_SLUG: (slug: string) => BASE_API_V1(`projects/slug/${slug}`),

  /* --------------------------------- USERS -------------------------------- */
  USERS_SEARCH_BY_LOGIN: BASE_API_V1("users/search"),

  /* ----------------------------------- ME ----------------------------------- */
  ME_PROJECT_LEADER_INVITATIONS: (projectId: string) => BASE_API_V1(`me/project-leader-invitations/${projectId}`),
  ME_REWARDS: BASE_API_V1("me/rewards"),
};
