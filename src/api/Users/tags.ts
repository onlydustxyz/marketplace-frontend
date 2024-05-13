import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const USERS_TAGS = {
  all: [RESSOURCE_TAGS.USERS],
  users: (login?: string) => [...USERS_TAGS.all, "users", { login }],
  user_profile_by_github_id: (githubUserId: string) => [
    RESSOURCE_TAGS.USERS,
    "user-profile-by-github-id",
    { githubUserId },
  ],
  user_profile_by_github_login: (login: string) => [RESSOURCE_TAGS.USERS, "user-profile-by-github-login", { login }],
  user_contributions: (login: string) => [RESSOURCE_TAGS.USERS, "user-contributions", { login }],
};
