import { RESSOURCE_TAGS } from "../../src/api/ressource-tags";

export const ProjectActionTags = {
  all: RESSOURCE_TAGS.PROJECTS,
  by_slug: (slug: string) => `${RESSOURCE_TAGS.PROJECTS}-details-${slug}`,
};
