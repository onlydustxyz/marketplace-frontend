import { RESSOURCE_TAGS } from "../../src/api/ressource-tags";

export const UsersActionTags = {
  all: RESSOURCE_TAGS.USERS,
  details: (id: string) => `${RESSOURCE_TAGS.USERS}-details-${id}`,
};
