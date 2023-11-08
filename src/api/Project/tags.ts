import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const PROJECT_TAGS = {
  all: [RESSOURCE_TAGS.PROJECTS],
  slugs: () => [...PROJECT_TAGS.all, "slugs"],
  slug: (slug: string) => [...PROJECT_TAGS.slugs(), { slug }],
};
