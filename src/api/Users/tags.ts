import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const USERS_TAGS = {
  all: [RESSOURCE_TAGS.USERS],
  users: (login?: string) => [...USERS_TAGS.all, "users", { login }],
};
