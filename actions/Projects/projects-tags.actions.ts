import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const ProjectActionTags = {
  by_slug: (slug: string) => `${RESSOURCE_TAGS.PROJECTS}-details-${slug}`,
};
